# Proiect-IAS - BOLEA Vladut-Ionut

Pentru a configura aplicatia sunt necesare urmatoarele comenzi:

`npm install`
`npx prisma db push` - pentru generarea bazei de date de sqlite
`npm run dev`

Proiectul consta intr-o aplicatie ce foloseste NextJS impreuna cu:

1. Prisma ca si ORM pentru gestionarea bazei de date folosind obiecte de JS/TS in loc de interogari SQL
2. TRPC pentru a simplifica request-urile catre partea de backend dar si pentru a avea un type-safety general frontend-backend
3. NextAuth pentru simplitatea configurarii fata de scrierea de la 0 a unui sistem de autentificare
4. ReactQuery in combinatie cu TRPC - in principiu pentru usurinta cu care se invalideaza cache-ul si provoaca refetch - mai multe detalii mai jos.
5. Tailwind CSS - pentru ca am preferat sintaxa scurta de sql si mai ales faptul ca pot scrie rapid CSS fara a schimba fisierele de la ts la css.
6. Baza de date hostata pe SQL Lite pentru usurinta folosirii pentru proiecte ca acesta.

#Din pacate nu am gasit un serviciu gratuit pentru hostarea bazei de date iar vercel este read-only, ne-avand permisiuni la creata bazei de date SQL Lite pe instanta lor,
aplicata hostata nu va functiona decat extrem de limitat.

https://proiect-ias.vercel.app/

Structura bazei de date:
Un board poate avea mai multe card-uri - iar un card poate avea mai multe task-uri.
Fiecare dintre aceste obiecte are campurile corespunzatoare cerintei si un owner - utilizatorul care a creat obiectul.

Toate actiunile de citire - corespunzatoare request-urilor de GET sunt publice si utilizatorii neautentificati au acces la ele.
Doar utilizatorii autentificati pot crea noi board-uri, carduri si task-uri. Aceste limitari sunt impuse atat din UI, butoanele cu actiunile interzise dispar - dar si din API,
procedurile de TRPC fiind private - adica verific ca exista o sesiune activa inainte de orice actiune.

Dupa fiecare modificare a obiectelor board, card, task - se invalideaza cache-ul request-ului de GET/al query-ului aferent, astfel incat, dupa fiecare modificare cauzam un refetch.
Am ales aceasta abordare in locul unui state sau hard refresh .
