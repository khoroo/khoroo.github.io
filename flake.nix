{
  description = "Flake for www.robert.sparks.me.uk";
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    swatches = {
      url = "github:khoroo/swatches";
      flake = false; # TODO: make true?
    };
    zola-theme = {
      url = "github:khoroo/emily_zola_theme";
      flake = false;
    };
  };
  outputs = { self, nixpkgs, flake-utils, ... }@inputs:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        themeName = ((builtins.fromTOML (builtins.readFile "${inputs.zola-theme}/theme.toml")).name);
      in
      {
        packages.website = pkgs.stdenv.mkDerivation rec {
          pname = "static-website";
          version = "2024-11-24";
          src = ./.;
          nativeBuildInputs = [ pkgs.zola ];

          configurePhase = ''
            # First make everything writable
            find . -type d -exec chmod 755 {} +
            find . -type f -exec chmod 644 {} +

            # Set up theme
            mkdir -p themes/${themeName}
            cp -r ${inputs.zola-theme}/* themes/${themeName}/
            chmod -R 755 themes
          '';

          buildPhase = ''
            chmod -R 755 .
            HOME=$TMPDIR zola build
          '';

          installPhase = ''
            chmod -R 755 public
            mkdir -p $out
            cp -r public/* $out/
            mkdir -p $out/swatches
            cp -r ${inputs.swatches}/docs/* $out/swatches/
          '';
        };

        packages.default = self.packages.${system}.website;

        devShell = pkgs.mkShell {
          packages = [ pkgs.zola ];
          shellHook = ''
            mkdir -p themes
            ln -sn "${inputs.zola-theme}" "themes/${themeName}"
          '';
        };
      }
    );
}
