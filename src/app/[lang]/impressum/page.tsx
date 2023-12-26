import Head from "next/head";

export default function Imprint() {

  return (
    <div>
      <Head>
        <title>Impressum</title>
        <meta name="description" content="The Imprint" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="flex justify-center my-5">
        <div className={"md:w-1/2 mmd:mx-5"}>
          <h1 className="text-4xl">Impressum</h1>
          <div>
            <h3 className="text-lg font-bold mt-4 mb-2">
              Angaben gemäß § 5 TMG:
            </h3>
            <p>{"Leon Laurin Wehrhahn Handel und Vertrieb"}</p>
            <p>Kieferngartenstr. 12</p>
            <p>80939 München</p>
            <h3 className="text-lg font-bold mt-4 mb-2">Vertreten durch:</h3>
            <p>Leon Laurin Wehrhahn</p>
            <h3 className="text-lg font-bold mt-4 mb-2">Kontakt</h3>
            <p>Telefon: +49 15733120846</p>
            <p>Email: support@thepersonpedia.de</p>
            <h3 className="text-lg font-bold mt-4 mb-2">Umsatzsteuer-ID:</h3>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:
            </p>
            <p>{"DE327330765"}</p>
            <h3 className="text-lg font-bold mt-4 mb-2">
              Hinweis auf EU-Streitschlichtung
            </h3>
            <p>
              Die Europäische Kommission stellt eine Plattform zur
              Online-Streitbeilegung (OS) bereit:
              https://ec.europa.eu/consumers/odr
            </p>
            <p>Unsere E-Mail-Adresse finden sie oben im Impressum.</p>
          </div>
          <h2 className="text-xl font-bold mt-10 mb-2">
            Haftungsausschluss (Disclaimer)
          </h2>
          <div>
            <h3 className="text-lg font-bold mt-4 mb-2">Haftung für Inhalte</h3>
            <p>
              Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt.
              Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte
              können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter
              sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten
              nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG
              sind wir als Diensteanbieter jedoch nicht verpflichtet,
              übermittelte oder gespeicherte fremde Informationen zu überwachen
              oder nach Umständen zu forschen, die auf eine rechtswidrige
              Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung
              der Nutzung von Informationen nach den allgemeinen Gesetzen
              bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch
              erst ab dem Zeitpunkt der Kenntnis einer konkreten
              Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden
              Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
            </p>
            <h3 className="text-lg font-bold mt-4 mb-2">Haftung für Links</h3>
            <p>
              Unser Angebot enthält Links zu externen Webseiten Dritter, auf
              deren Inhalte wir keinen Einfluss haben. Deshalb können wir für
              diese fremden Inhalte auch keine Gewähr übernehmen. Für die
              Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
              oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten
              wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße
              überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der
              Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle
              der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer
              Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von
              Rechtsverletzungen werden wir derartige Links umgehend entfernen.
            </p>
            <h3 className="text-lg font-bold mt-4 mb-2">Urheberrecht</h3>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
              diesen Seiten unterliegen dem deutschen Urheberrecht. Die
              Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
              Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
              schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              Downloads und Kopien dieser Seite sind nur für den privaten, nicht
              kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser
              Seite nicht vom Betreiber erstellt wurden, werden die
              Urheberrechte Dritter beachtet. Insbesondere werden Inhalte
              Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine
              Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
              entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen
              werden wir derartige Inhalte umgehend entfernen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
