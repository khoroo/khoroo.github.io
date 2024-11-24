{
  description = "A flake for developing and building a Zola site";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    emily-theme = {
      url = "github:khoroo/emily_zola_theme";
      flake = false;
    };
  };

  outputs = { self, nixpkgs, flake-utils, emily-theme }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        themeName = ((builtins.fromTOML (builtins.readFile "${emily-theme}/theme.toml")).name);
      in
      {
        packages.website = pkgs.stdenv.mkDerivation rec {
          pname = "static-website";
          version = "2024-11-24";
          src = ./.;
          nativeBuildInputs = [ pkgs.zola ];
          
          configurePhase = ''
            mkdir -p "themes/${themeName}"
            cp -r ${emily-theme}/* "themes/${themeName}"
          '';
          
          buildPhase = "zola build";
          installPhase = "cp -r public $out";
        };
        
        defaultPackage = self.packages.${system}.website;
        
        devShell = pkgs.mkShell {
          packages = [ pkgs.zola ];
          shellHook = ''
            mkdir -p themes
            ln -sn "${emily-theme}" "themes/${themeName}"
          '';
        };
      }
    );
}
