# Base de code du projet P6 - Parcours Front-end

## Démarrer le projet

Rien à installer ici, il suffit d'ouvrir le fichier `index.html`.

## Etapes pour utiliser eslint

1. Créer le gestionnaire de paquets npm, ouvrir un terminal et lancer la commande suivante

```shell
npm init -y
```

2. Installer les dépendances nécessaires, dans le terminal lancer la commande suivante

```shell
npm install eslint globals --save-dev
```

ou utiliser la commande mentionnée dans la documentation officielle de eslint [https://eslint.org/](https://eslint.org/)

```shell
npm init @eslint/config@latest
```

3. Créer un fichier `eslint.config.js`, ou le remplacer si il existe déjà par le contenu suivant

```javascript
import globals from "globals";

export default [
  {
    languageOptions: { globals: globals.browser },
    files: ["**/*.js"],
    rules: {
      "no-console": "error",
      "no-debugger": "error",
      "no-unused-vars": "warn",
      "no-undef": "off",
    },
  },
];
```

4. Ajouter le script `linting` dans le fichier `package.json`

```json
{
  "scripts": {
    "linting": "npx eslint ./scripts/"
  }
}
```

5. Lancer le script `linting` pour vérifier que le code est correctement formaté, dans le terminal lancer la commande suivante

```shell
npm run linting
```

6. Pour plus de détails sur les règles de linting, voir la documentation officielle de eslint [https://eslint.org/docs/rules/](https://eslint.org/docs/rules/)
