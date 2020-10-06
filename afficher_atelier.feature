Feature: Affichage des ateliers

    US: Lister les ateliers

    Scenario: Liste vide
        Given je suis sur la page principal
        When aucun atelier n'a été créé
        Then aucun atelier n'est affiché

    Scenario: Liste avec un atelier
        Given je suis sur la page principale
        When un atelier a été créer
        Then le nom de l'atelier est affiché
        And sa description est affichée en dessous du nom.

    Scenario: Liste avec plusieurs ateliers
        Given je suis sur la page principale
        When plusieurs ateliers ont été créés
        Then tous les ateliers sont affichés les uns à la suite des autres
            avec leurs noms et leurs descriptions.