# Hozzájárulási Útmutató

Köszönjük, hogy hozzá szeretnél járulni a projekt fejlesztéséhez! Az alábbiakban találsz néhány iránymutatást és információt, hogy hogyan teheted meg.

## Hozzájárulási Lépések

1. Forkold a projektet a saját fiókodba.
2. Hozz létre egy új ágat a fejlesztéshez:

    ```bash
    git checkout -b feature/<új-funkció>
    ```

3. Fejlessz a kódbázison, és kövesd a kódolási irányelveinket.

4. Commitold a változtatásaid:

    ```bash
    git commit -m "Új <új-funkció> hozzáadva"
    ```

5. Pushold az ágadat a saját távoli ágadra:

    ```bash
    git push origin feature/<új-funkció>
    ```

6. Küldj egy Pull Requestet a fő repositoryba. Kérjük, töltsd ki a [Pull Request sablont](PULL_REQUEST_TEMPLATE.md).

## Fejlesztési Irányelvek

- Tartsd a kódbázist tiszta és olvasható formában.
- Kövesd az eslint és a prettier irányelveit.

## Tesztelés

Győződj meg róla, hogy a változtatásaid jól működnek és nem rontanak el más funkciókat. Adj hozzá megfelelő teszteket, ha szükséges.

## Jelentés Hiba vagy Funkciókérés esetén

Ha hibát találsz, vagy új funkciót szeretnél kérni, kérjük, hogy nyiss egy problémát a GitHubon. Biztosítsd a lehető leghasznosabb információkat a probléma vagy az új funkció leírásához.

Köszönjük a hozzájárulásodat!
