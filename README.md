
# Front d'AppDepenses

## Justification des choix

Cette application a été développée en Vue.js et utilise le framework CSS Tailwind.

J'ai choisi d'utiliser Vue.js car j'ai pensé que réaliser une Single page application était adaptée a la taille du projet et correspondait aux besoins. J'ai aussi eu l'occasion d'utiliser cette technologie plusieurs fois en cours et en entreprise.

J'ai choisi d'utiliser Tailwind pour sa simplicité d'utilisation qui permet de rapidement créer une application avec un design simple.

## Dépendances

Ce projet utilise les dépendances suivantes :
```

autoprefixer
core-js
postcss
tailwindcss
vue
vue-router
vue3-cookies

```


## Installation du projet

```

npm install

```

  

## Lancer le projet en local

```

npm run serve

```
## Utilisation

L'application permet de consulter les dépenses de la collocation et connaitre les montants dus à chacun. 

Afin d'ajouter de nouvelles dépenses ou catégories et les modifier, l'utilisateur devra se créer un compte sur la page Utilisateurs et ensuite se connecter.

Lors de la création d'une nouvelle dépense, il est obligatoire de lui donner une catégorie, au moins un utilisateur concerné par celle-ci et le montant de la dépense.