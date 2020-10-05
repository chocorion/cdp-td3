Feature: Création d'un atelier

    US Tester la création d'un atelier.

    Scenario: Aller sur la page de création
        Given Je suis sur la page principale
        When Je clique sur le boutton "Create new workshop"
        Then Je suis sur l'interface de création d'un atelier.

    Scenario: Création d'un atelier valide
        Given Je suis sur l'interface de création d'un atelier
        When Je rentre un nom dans le champ "Name"
        And je rentre une description dans le champ "Description"
        And je clique sur le boutton "Save"
        Then je suis redirigé sur la page qui liste les ateliers

    Scenario: Création d'un atelier incomplet
        Given je suis sur l'interface de création d'un atelier
        When tous les champs ne sont pas remplis
        And je click sur le boutton "Save"
        Then une popup s'affiche me demandant de renseigner les champs non remplis
        And je reste sur l'interface de création d'un atelier.
    
    Scenario: Annulation de la création d'un atelier
        Given je suis sur l'interface de création d'un atelier
        And j'ai saisi des informations dans les champs "Name" et "Description"
        When je click sur le button "Cancel"
        Then je suis redirigé sur la page principale
        And l'atelier n'a pas été créé.