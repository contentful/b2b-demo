import {
  DataTableColumn,
  Quote,
  QuoteTableData,
} from '@/models/commerce-types';
import { localizeCurrency } from '@/utils/locale-utils';

export const QUOTE_DATA_COLS: Array<DataTableColumn> = [
  { key: 'creationTime', label: 'Created', format: 'datetime' },
  { key: 'status', label: 'Status', format: 'label' },
  { key: 'expirationTime', label: 'Expires', format: 'datetime' },
  { key: 'totalPrice', label: 'Cost', format: 'text' },
  { key: 'totalItems', label: 'Products', format: 'number' },
  { key: 'totalUnitCount', label: 'Units', format: 'number' },
  { key: 'guid', label: 'User', format: 'text' },
];

export const getQuote = async (code: string): Promise<Quote> | null => {
  if (!code) return null;
  return MockQuotes.find((quote) => quote.code === code);
};

export const getQuotesByOrg = async (
  orgUnit: string,
  locale: string,
  tableData: boolean = false
): Promise<Array<Quote | QuoteTableData>> | null => {
  if (!orgUnit || (tableData && !locale)) return null;

  const quotes = tableData
    ? getQuotesTableData(locale, 'orgUnit', orgUnit)
    : getQuotes('orgUnit', orgUnit);

  if (!quotes) return null;

  return quotes;
};

export const getQuotesByUser = async (
  guid: string,
  locale: string,
  tableData: boolean = false
): Promise<Array<Quote | QuoteTableData>> | null => {
  if (!guid || (tableData && !locale)) return null;

  const quotes = tableData
    ? getQuotesTableData(locale, 'guid', guid)
    : getQuotes('guid', guid);

  if (!quotes) return null;

  return quotes;
};

export const getQuotes = async (
  key: string,
  value: string
): Promise<Array<Quote>> | null => {
  if (!(key && value)) return null;

  const quotes = MockQuotes.filter((quote: any) => quote[key] === value).sort(
    (a: any, b: any) => {
      if (a.createdDate > b.createdDate) return 1;
      if (a.createdDate < b.createdDate) return -1;
      return 0;
    }
  );

  if (!quotes) return null;

  return quotes;
};

export const getQuotesTableData = async (
  locale: string,
  key: string,
  value: string
): Promise<Array<QuoteTableData>> | null => {
  if (!(key && value)) return null;

  const quotes = MockQuotes.filter((quote: any) => quote[key] === value).map(
    (quote: any) => {
      return {
        purchaseOrderNumber: quote.purchaseOrderNumber,
        totalPrice: localizeCurrency(locale, quote.totalPrice.value) || '',
        status: quote.status,
        creationTime: quote.creationTime,
        updateTime: quote.updateTime,
        expirationTime: quote.expirationTime,
        totalItems: quote.totalItems,
        totalUnitCount: quote.totalUnitCount,
        delivery: quote.deliveryMode?.name || '',
        costCenterCode: quote.costCenter?.code || '',
        guid: quote.guid,
        orgUnit: quote.orgUnit,
        code: quote.code,
      };
    }
  );

  if (!quotes) return null;
  return quotes;
};

const MockQuotes: Array<Quote> = [
  {
    code: '0000857',
    status: 'saved',
    guid: 'e0510389',
    orgUnit: '0005678',
    entries: [
      {
        entryNumber: 5,
        quantity: 250,
        basePrice: {
          value: 11,
        },
        totalPrice: { value: 2750 },
        product: {
          code: '4600658',
          description:
            '<b>Große Produktpalette</b><br/>Wentronic bietet eine große Bandbreite an Zubehörprodukten an. Audio/Video-, PC-, Telekommunikations-, TV/Radio- und Stromkabel sowie Akkus und Batterien sind in unterschiedlichen Ausführungen und Leistungsstufen erhältlich. Im Anfrageformular können Sie ganz einfach das passende Produkt in der gewünschten Menge bestellen.<br/><br/><b>Standard- oder OEM-Design – Es liegt ganz bei Ihnen</b><br/>Haben Sie spezielle Anforderungen für ein Zubehörteil oder ein OEM-Produkt? Wentronic fertigt es nach Ihren Wünschen. Senden Sie uns Ihr Datenblatt zu und wir ermitteln für Sie die Herstellung, bei der Sie das beste für Ihr Geld erhalten. Wir bieten auch zahlreiche Verpackungsdienstleistungen in Ihrem Design an.',
          images: [
            {
              format: 'thumbnail',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3w1NTE4fGltYWdlL2pwZWd8YUdVM0wyZ3dNaTg0TnprMk16QXhNall5T0RjNHwzYTQyYjFiYjAwOGQ0NjljY2FlNzI2ZWYwNTljMTM1OTdmM2FhZGYzYWRlN2IzNjMyNTkzZmY2ZDQxYWJlN2Fj',
            },
            {
              format: 'product',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wxMTM3M3xpbWFnZS9qcGVnfGFEaGlMMmcwTmk4NE56azJNamMwTURZMU5ETTR8MjY2NDMyYjMxMzQzZWJjN2Y1NzExMDFlODMyMTMxM2M1MTAwZDRlYzI2ZTAxZGFhYzA2Yjc4ZTE1YzQwZjQyNA',
            },
          ],
          manufacturer: 'Wentronic',
          name: '77118',
          price: {
            value: 11,
          },
          priceRange: {},
          stock: { isValueRounded: false, stockLevelStatus: 'inStock' },
          summary:
            'Schraubendreherset – 7-teilig, hochwertiger japanischer S2-Werkzeugstahl',
        },
      },
      {
        entryNumber: 6,
        quantity: 250,
        basePrice: {
          value: 20,
        },
        totalPrice: { value: 5000 },
        product: {
          code: '4598185',
          description:
            '<b>Große Produktpalette</b><br/>Wentronic bietet eine große Bandbreite an Zubehörprodukten an. Audio/Video-, PC-, Telekommunikations-, TV/Radio- und Stromkabel sowie Akkus und Batterien sind in unterschiedlichen Ausführungen und Leistungsstufen erhältlich. Im Anfrageformular können Sie ganz einfach das passende Produkt in der gewünschten Menge bestellen.<br/><br/><b>Standard- oder OEM-Design – Es liegt ganz bei Ihnen</b><br/>Haben Sie spezielle Anforderungen für ein Zubehörteil oder ein OEM-Produkt? Wentronic fertigt es nach Ihren Wünschen. Senden Sie uns Ihr Datenblatt zu und wir ermitteln für Sie die Herstellung, bei der Sie das beste für Ihr Geld erhalten. Wir bieten auch zahlreiche Verpackungsdienstleistungen in Ihrem Design an.',
          images: [
            {
              format: 'thumbnail',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wyNTQwNnxpbWFnZS9qcGVnfGFETmtMMmd3TXk4NE56azJNekF4TWpNd01URXd8MmE4YzQxMzFiYTYxMWUxYWUzMjcwY2MyNWEwZGIyNDA3MWFmZGE2YzlmM2FhMWQ4NjBmMDYwYTJiM2Y0YTZhYw',
            },
            {
              format: 'product',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3w0MTA0NXxpbWFnZS9qcGVnfGFHVXlMMmcwTmk4NE56azJNamMwTURNeU5qY3d8NDE1NWMyNTRkMmVkZTNkNTNjNTY5OTY3YzhmOTQ2ZjMxM2U1NWYwYjVmMGVhNGFlYjY1NDE4NjYwNDc5NGU3Ng',
            },
          ],
          manufacturer: 'Wentronic',
          name: '77117',
          price: {
            value: 20,
          },
          priceRange: {},
          stock: { isValueRounded: false, stockLevelStatus: 'inStock' },
          summary:
            'Schraubendreher- und Bitset – 32-teilig, aus hochwertigem S2-Werkzeugstahl',
        },
      },
      {
        entryNumber: 7,
        quantity: 250,
        basePrice: {
          value: 8,
        },
        totalPrice: { value: 2000 },
        product: {
          code: '5888798',
          description:
            '<b>Das sagen Experten:</b><br/><br/>Guru3D über das HIS Game‘s Werkzeugset – Das HIS-Bundle ist unschlagbar. Mit magnetischem Multifunktions-Schraubendreher mit LED plus Staub-Scheibenwischer und ein Coupon für den Download der Vollversion des Spiels „Colin McRae Dirt 2“. Die Auszeichnung auf der rechten Seite ist eine bedeutende Auszeichnung für Spiele, die wir HIS hiermit verleihen.<br/><br/><b>Schraubendreherset – enthält 4 Schraubendreherköpfe</b><br/><br/><b>Wasserwaage – messen Sie, wie horizontal (eben) oder vertikal (Lot) eine Oberfläche ist.</b><br/><br/><b>Staubwischer – Zum Reinigen von Grafikkartenkühlung, Belüftung, Monitor und Tastatur</b><br/><br/><b>LED-Licht – zur Beleuchtung bei Schraubarbeiten in schwer zugänglichen Bereichen</b><br/><br/><b>Produktvorteile</b><br/>– 1. Ideal zum Schrauben schwer zugänglicher Bereiche<br/>– 2. Griffe mit Softgrip für bequemen Halt<br/>– 3. Gut geeignet für die Hardwareinstallation.',
          images: [
            {
              format: 'thumbnail',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wyNjk2fGltYWdlL2pwZWd8YUdSbUwyZ3hOQzg0TnprMk16QXhPVFV4TURBMnwwYjYwM2I4ZmMwNzRjOWJmZWEwMTYyZDNmOGVlYmE0ZTk4N2JhZTBhZTQxY2IzYTY1MzU2OTI0ZTcwNDU0NTNj',
            },
            {
              format: 'product',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wxMDY0NHxpbWFnZS9qcGVnfGFETmxMMmd6TlM4NE56azJNamMwTlRnNU56STJ8MDI2ZmQxMTQzODY1OTgwY2M2YzMxYWUxOTRhYTM3ODlkMGNlMDJhNDc4MzdjODQzZTRjZjhkNDgyOGZmYjQyNA',
            },
          ],
          manufacturer: 'HIS',
          name: 'HGTK01-SB',
          price: {
            value: 8,
          },
          priceRange: {},
          stock: { isValueRounded: false, stockLevelStatus: 'inStock' },
          summary: 'HIS Gamer-Werkzeugset',
        },
      },
      {
        entryNumber: 8,
        quantity: 250,
        basePrice: {
          value: 17,
        },
        totalPrice: { value: 4250 },
        product: {
          code: '3881338',
          images: [
            {
              format: 'thumbnail',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wxODg2fGltYWdlL2pwZWd8YURrd0wyZzVOaTg0TnprMk1qa3lOVGM1TXpVNHwxZWYyYzY0Njg2NjMwNzJiYjA3ZDI1NjBlNzNiYWYzMjQ4NDkxN2U4OGVlMGIyOTQwM2FkNTdiMzRmNjAyZjMz',
            },
            {
              format: 'product',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3w5MjA1fGltYWdlL2pwZWd8YUdObEwyaGhOUzg0TnprMk1qWTFNalV3T0RRMnw0NjFjYjkxYTU5MjYxNWE3ZWI3M2I5ZGIyMDkyNTJjNTZiM2VkYWYwODVjZWU5ZGZiZjQ3MDA4MjFjY2UzY2Q4',
            },
          ],
          manufacturer: 'Skil',
          name: 'Akkuschrauber 2148',
          price: {
            value: 17,
          },
          priceRange: {},
          stock: { isValueRounded: false, stockLevelStatus: 'inStock' },
        },
      },
      {
        entryNumber: 5,
        quantity: 250,
        basePrice: {
          value: 30,
        },
        totalPrice: { value: 7500 },
        product: {
          code: '3794609',
          images: [
            {
              format: 'thumbnail',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wxNDg2fGltYWdlL2pwZWd8YURobEwyaGhNQzg0TnprMk1qZzBOekUxTURNNHxhNmU3ZjM0NzJlY2Y5YzMyZWJjZjJkODAyMTQ2YmJiZGFjNWU1NmQ2NDE2ZThiNjUyODRlNThmMWMwNWNhZTE0',
            },
            {
              format: 'product',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3w4MDY5fGltYWdlL2pwZWd8YUdKaEwyZzVOeTg0TnprMk1qVTNOVFV3TXpZMnw1ZDViZjA3OTlmODYwZDUzMWQwODBhYzFjM2IwOGUwZGI3MTc3NWJmMzkyYWZmYzEzMzg3ZjUzZjc1NmNjZjIz',
            },
          ],
          manufacturer: 'Black & Decker',
          name: 'Akkuschrauber 2,4 V, mit Verpackung',
          price: {
            value: 30,
          },
          priceRange: {},
          stock: { isValueRounded: false, stockLevelStatus: 'inStock' },
        },
      },
      {
        entryNumber: 6,
        quantity: 250,
        basePrice: {
          value: 10,
        },
        totalPrice: { value: 2500 },
        product: {
          code: '3795253',
          description:
            'Spindelarretierung für die manuelle Verwendung und bei Bedarf für bessere Kontrolle beim Anschrauben und beim Festziehen von Schrauben.<br/>Vorwärts-/Rückwärtsschieber zum einfachen Festziehen und Lösen von Schrauben.<br/>Planetengetriebe mit 130 U/min.<br/>Erweiterte Mobilität in engen Räumen.<br/>Herausnehmbare AA Alkaline-Batterien für einfache Anwendung.',
          images: [
            {
              format: 'thumbnail',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wxODU5fGltYWdlL2pwZWd8YUdZd0wyaG1PUzg0TnprMk1qZzFNamN5TURrMHxjMjhmYWJiODYzZWViZDM1Nzk3YTFiMzZkMWQ3NjA4OWQ3OTEwZWRmZGY1NjEwZWE0MWUzMWU4YmE1YTY2NGY4',
            },
            {
              format: 'product',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wxMTkzMXxpbWFnZS9qcGVnfGFHWTBMMmd6TkM4NE56azJNalU0TXpNMk56azR8ZmE5MGUyZTE5YTdmNDJmYTQ2MmIxM2VjZTUzNjJmYzIwZWNjNTE4YTc4MWRmODY4NTA4YWNjZDA0NmM2YzZiNg',
            },
          ],
          manufacturer: 'Black & Decker',
          name: 'Akkuschrauber KC9006',
          price: {
            value: 10,
          },
          priceRange: {},
          stock: { isValueRounded: false, stockLevelStatus: 'inStock' },
          summary: 'Akkuschrauber KC9006',
        },
      },
    ],
    totalItems: 6,
    totalUnitCount: 1500,
    subTotal: { value: 24000 },
    totalDiscounts: { value: 0 },
    totalTax: { value: 0 },
    totalPriceWithTax: { value: 24000 },
    deliveryAddress: {
      id: '0005678',
      street1: 'Hasenheide 109',
      city: 'Berlin',
      countryCode: 'DE',
      postalcode: '10967',
      defaultAddress: true,
      shippingAddress: true,
      visible: true,
    },
    deliveryMode: {
      code: 'dhl-standard',
      name: 'DHL Standard',
      deliveryCost: { value: 0.1 },
    },
    totalPrice: { value: 26400 },
    purchaseOrderNumber: 'po253719',
    creationTime: '2025-01-13T20:29:09.386Z',
    expirationTime: '2025-02-12T20:29:09.386Z',
    updateTime: '2025-01-19T20:29:52.839Z',
  },
  {
    code: '0000635',
    status: 'submitted',
    guid: 'e0510389',
    orgUnit: '0005678',
    entries: [
      {
        entryNumber: 1,
        quantity: 250,
        basePrice: {
          value: 78,
        },
        totalPrice: { value: 19500 },
        product: {
          code: '4567134',
          description:
            '– Mit dem Bosch SDS-System: schneller und einfacher Sägeblattwechsel ohne Werkzeug über eine Schiebetaste.<br/>– Bosch Electronic Schlagzahlsteuerung: „beschleunigt“ von Null auf Maximum über den Auslöseschalter – für materialspezifisches Arbeiten<br/>- Integrierter',
          images: [
            {
              format: 'thumbnail',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wyNDIxfGltYWdlL2pwZWd8YURCbEwyZzRPQzg0TnprMk1qazVORGt6TkRBMnxmNWE3ZDc2MjU0YWJhYzEyODc3NzI0NWE2YzlmNzUzNDViZTRmYjVhYTAwNzBiMDlmNzM3NjEyNDIwNWMxZTAx',
            },
            {
              format: 'product',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wxMjMwMnxpbWFnZS9qcGVnfGFERXpMMmhtTXk4NE56azJNamN5TkRJM01ETTR8ZmIxMTQwZTYwODkxNjNlZTMyYzJmNmZmOGFiYmRmZThhMWZjNGZlMzc4Nzk0N2NmNDAxNzIyZWI3MTJkZWJhNQ',
            },
          ],
          manufacturer: 'Bosch',
          name: 'PFZ 500 E',
          price: {
            value: 78,
          },
          priceRange: {},
          stock: { isValueRounded: false, stockLevelStatus: 'inStock' },
          summary: 'PFZ 500 E, Allzwecksäge',
        },
      },
      {
        entryNumber: 2,
        quantity: 250,
        basePrice: {
          value: 74,
        },
        totalPrice: { value: 18500 },
        product: {
          code: '4567130',
          description:
            '– Das Zubehör kann in unterschiedlichen Winkeln angebracht werden, was das Arbeiten in schwer zugänglichen Bereichen und in Ecken erleichtert<br/>– Softgrip, kompaktes Gehäuse und optimale Ergonomie für sichere Führung und kraftsparendes Arbeiten<br/>– Staubauslass – für Staub',
          images: [
            {
              format: 'thumbnail',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wxMDM4NHxpbWFnZS9qcGVnfGFETTFMMmc0Wmk4NE56azJNams1TWpZME1ETXd8ZDAxOGQ5YTExNzFkMmNmYWVlNDAzNWYyMTJlYmM0ZjA2ODk5NjQ1MjdiZjdhNjZhYTFkZDZhNjRjOThmNGUwYQ',
            },
            {
              format: 'product',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wxOTMzOXxpbWFnZS9qcGVnfGFEY3lMMmc1WVM4NE56azJNamN4T1RNMU5URTR8YjQ1NDk2MGI5YmE1ZDgzNmRiZmQ0ZTM5ZDczZGUxZjA0MmE3Mzk1YjQ0ZTBlOTg1OWQ2MDc1ZmY3N2MwMWQwNw',
            },
          ],
          manufacturer: 'Bosch',
          name: 'PMF 180 E',
          price: {
            value: 74,
          },
          priceRange: {},
          stock: { isValueRounded: false, stockLevelStatus: 'inStock' },
          summary: 'PMF 180 E Multifunktions-Werkzeug',
        },
      },
      {
        entryNumber: 3,
        quantity: 100,
        basePrice: {
          value: 128,
        },
        totalPrice: { value: 12800 },
        product: {
          code: '4567162',
          description:
            '– Gebläse beseitigt Sägespäne und sorgt so für klare Sicht, kann zum effektiven Absaugen abgeschaltet werden<br/>– Besonders hohe Laufruhe beim Sägen ermöglicht beste Ergebnisse und ermüdungsfreies Arbeiten<br/>– Elektronische Steuerung für materialspezifisches Arbeiten<br/>– 4',
          images: [
            {
              format: 'thumbnail',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wzNDY0fGltYWdlL2pwZWd8YURZM0wyZzROUzg0TnprMk1qazVOVEkyTVRjMHwyM2I2NmRlMjcwMzRjZmFmZmVjMzAwODM5Y2ZhYTliOGZjYTVjZTQyMWJhYTlmNjc1OTg0OThmN2ZjYmRmOTA4',
            },
            {
              format: 'product',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wxNzM2M3xpbWFnZS9qcGVnfGFHUTBMMmhtTXk4NE56azJNamN5TkRreU5UYzB8ZjNjZjQyMTNlMWE3MjBiOTUxYjc2NjdmOTQzNjY3ZmU0MDNmZWZiZDNmYTg4ZjQzOTJhZmE5YTc0N2U0NTQyOA',
            },
          ],
          manufacturer: 'Bosch',
          name: 'GST 75 BE',
          price: {
            value: 128,
          },
          priceRange: {},
          stock: { isValueRounded: false, stockLevelStatus: 'inStock' },
          summary: 'GST 75 BE Professional, Stichsäge',
        },
      },
      {
        entryNumber: 4,
        quantity: 100,
        basePrice: {
          value: 172,
        },
        totalPrice: { value: 17200 },
        product: {
          code: '4567163',
          description:
            '– Hochwertiger Schnitt in Kreisen, Geradschnitten und Gehrungsschnitten<br/>– Hohe Schneidleistung aufgrund der 4-stufigen Pendelbewegung<br/>– Elektronische Steuerung für materialorientiertes Arbeiten<br/>– 580-W-Motor mit großen Reserven<br/>– Beispiel',
          images: [
            {
              format: 'thumbnail',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wxMzUxMXxpbWFnZS9qcGVnfGFERXdMMmc0TlM4NE56azJNams1TlRVNE9UUXl8MmFkOGQ0MTFlNmUzYWYxYmM4N2ViZWM1MDczMzBlZTZjMWMwMTkwM2VjNTY0ZThmMGRlYWYyY2YxMWFmMmQ1Yw',
            },
            {
              format: 'product',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wyNzA2MXxpbWFnZS9qcGVnfGFHUXlMMmhtTmk4NE56azJNamN5TlRVNE1URXd8YTZlNWJjZjYxNzE1MTRmNzczMTcwZjljNWFhOGNmNmRiMzYzNzMyYWVkMGM2NzE0OGIwYWJhMjU5NmRkMmIzYw',
            },
          ],
          manufacturer: 'Bosch',
          name: 'GST 85 PE',
          price: {
            value: 172,
          },
          priceRange: {},
          stock: { isValueRounded: false, stockLevelStatus: 'inStock' },
          summary: 'GST 85 PE Professional',
        },
      },
    ],
    totalItems: 4,
    totalUnitCount: 700,
    subTotal: { value: 68000 },
    totalDiscounts: { value: 0 },
    totalTax: { value: 0 },
    totalPriceWithTax: { value: 68000 },
    deliveryAddress: {
      id: '0005678',
      street1: 'Hasenheide 109',
      city: 'Berlin',
      countryCode: 'DE',
      postalcode: '10967',
      defaultAddress: true,
      shippingAddress: true,
      visible: true,
    },
    deliveryMode: {
      code: 'dhl-standard',
      name: 'DHL Standard',
      deliveryCost: { value: 0.1 },
    },
    totalPrice: { value: 74800 },
    purchaseOrderNumber: 'po241466',
    creationTime: '2024-12-16T20:25:47.107Z',
    expirationTime: '2025-01-15T20:25:47.107Z',
    updateTime: '2025-01-06T20:26:33.143Z',
  },
  {
    code: '000059',
    status: 'approved',
    guid: 'e0510389',
    orgUnit: '0005678',
    entries: [
      {
        entryNumber: 1,
        quantity: 100,
        basePrice: {
          value: 116,
        },
        totalPrice: { value: 11600 },
        product: {
          code: '3857733',
          description:
            'Standardausrüstung.<br/>Schnellladegerät, Akku, Schraubendreherbit, Koffer.',
          images: [
            {
              format: 'thumbnail',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wyNzEyfGltYWdlL2pwZWd8YURjeEwyaG1OUzg0TnprMk1qZzFOek13T0RRMnxiM2JlODZiOWZmN2E5MTdjNDJhYjBjYzFhNmU1NzI1MTlhZTI0Y2IxMDExMDg3ZDBjMTNjZjg1ODBiZDk5NDFk',
            },
            {
              format: 'product',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wxMzA5N3xpbWFnZS9qcGVnfGFEaGlMMmd6TVM4NE56azJNalU0TkRNMU1UQXl8NzYwYTMyYTk4ZmY1MDNlMzg5Njc3YzNkYmRiOTljNWE1YjcwMWM4NTUzYzIxMjEyOGJiNWU2NzlhNWQ4ZmQwNw',
            },
          ],
          manufacturer: 'Makita',
          name: 'DF030DWE',
          price: {
            value: 116,
          },
          priceRange: {},
          stock: { isValueRounded: false, stockLevelStatus: 'inStock' },
          summary: 'DF030DWE 10,8 V Bohrschrauber',
        },
      },
      {
        entryNumber: 2,
        quantity: 100,
        basePrice: {
          value: 148,
        },
        totalPrice: { value: 14800 },
        product: {
          code: '3857732',
          images: [
            {
              format: 'thumbnail',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wzMDI2fGltYWdlL2pwZWd8YURrNEwyaG1ZeTg0TnprMk1qZzFOVEF4TkRjd3wwODk1MTcyMjA2NjU5ZGE4NzE4ODVjOWI0OWNkNzM2YTAwM2JiMGM0ZGVhYWJjNGE1MDgwZDI1OGYzNzI5YmNk',
            },
            {
              format: 'product',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wxNDc1MHxpbWFnZS9qcGVnfGFHVXpMMmd6TVM4NE56azJNalU0TkRBeU16TTB8NzVlMzZiYzIzODkwMjU0ZTFkOWQ5NmQzOTA3YzVhOTYyZGQ3ZTdjZGMzMmQyMThjMTVhMjhhYTI0N2FlMzc1Ng',
            },
          ],
          manufacturer: 'Makita',
          name: '6270DWAE',
          price: {
            value: 148,
          },
          priceRange: {},
          stock: { isValueRounded: false, stockLevelStatus: 'inStock' },
        },
      },
      {
        entryNumber: 3,
        quantity: 100,
        basePrice: {
          value: 113,
        },
        totalPrice: { value: 11300 },
        product: {
          code: '3857734',
          images: [
            {
              format: 'thumbnail',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wyMzA0fGltYWdlL2pwZWd8YURGaEwyaG1OUzg0TnprMk1qZzFOell6TmpFMHwyMmM4OTViYzZiYmIzY2Y4N2U3MWVkZjdjYTZlOGI0NjM3ZGIzNjk0ZDA5YmQwN2U3NTU5NjBlZmU1ZjA5YzFl',
            },
            {
              format: 'product',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wxMTAyM3xpbWFnZS9qcGVnfGFEZGlMMmd5WlM4NE56azJNalU0TlRBd05qTTR8M2NmYjdiNWYwMWY0ZDBmYjM1YTg3NTRmYjYwOTA2YTYzODY2YjU5ZWM4YmQ2NmExN2QyZjEyMTU3YzQ3MTk3ZQ',
            },
          ],
          manufacturer: 'Makita',
          name: '6271DWAE',
          price: {
            value: 113,
          },
          priceRange: {},
          stock: { isValueRounded: false, stockLevelStatus: 'inStock' },
        },
      },
      {
        entryNumber: 4,
        quantity: 250,
        basePrice: {
          value: 94,
        },
        totalPrice: { value: 23500 },
        product: {
          code: '3857735',
          description:
            '7,2 V Schlagschrauber. Leicht und verstellbar. Dieses Werkzeug zieht die härtesten Schrauben in schwer zu erreichenden Bereichen an.',
          images: [
            {
              format: 'thumbnail',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wyMDk0fGltYWdlL2pwZWd8YURGaUwyaG1NaTg0TnprMk1qZzFPREk1TVRVd3xmYjQwZjljZjZhMDk2NDMyYjM1NTM4NjFlMzc3OTk3YzRmMjM3Nzk2NjhhMDYwNzc4NDY5MjU4ZDg2Y2FhNmQ0',
            },
            {
              format: 'product',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3w5NjQzfGltYWdlL2pwZWd8YUdOakwyZ3laQzg0TnprMk1qVTROVFkyTVRjMHw1M2E2MTBmYzNkZTUwOTgzODQ4ZGQ5ODY2N2UzNTU4YzI2MTEyNTQ3NmQwMDAxYTE0MzEyYThmMTM4NGI2MGMw',
            },
          ],
          manufacturer: 'Makita',
          name: 'Schlagschrauber 7,2 V',
          price: {
            value: 94,
          },
          priceRange: {},
          stock: { isValueRounded: false, stockLevelStatus: 'inStock' },
          summary: 'Schlagschrauber 7,2 V',
        },
      },
    ],
    totalItems: 4,
    totalUnitCount: 550,
    subTotal: { value: 61200 },
    totalDiscounts: { value: 0 },
    totalTax: { value: 0 },
    totalPriceWithTax: { value: 61200 },
    deliveryAddress: {
      id: '0005678',
      street1: 'Hasenheide 109',
      city: 'Berlin',
      countryCode: 'DE',
      postalcode: '10967',
      defaultAddress: true,
      shippingAddress: true,
      visible: true,
    },
    deliveryMode: {
      code: 'dhl-standard',
      name: 'DHL Standard',
      deliveryCost: { value: 0.1 },
    },
    totalPrice: { value: 67320 },
    purchaseOrderNumber: 'po39709',
    creationTime: '2024-11-11T20:17:29.833Z',
    expirationTime: '2024-12-11T20:17:29.833Z',
    updateTime: '2024-12-02T20:18:48.411Z',
  },
  {
    code: '0000268',
    status: 'expired',
    guid: 'e0510389',
    orgUnit: '0005678',
    entries: [
      {
        entryNumber: 1,
        quantity: 500,
        basePrice: {
          value: 12,
        },
        totalPrice: { value: 6000 },
        product: {
          code: '3788612',
          description:
            '– Scharnier mit Feststelltaste <br/>– Umkehrschalter für Rechts-/Linksdrehung <br/>– Lampe <br/> <br/><br>Standardzubehör </b><br/>– 6-7-8-9-10-11-12-13 mm Steckschlüssel <br/>– Halterung für den Steckschlüssel <br/>– Magnetischer Bithalter <br/>– 28 unterschiedliche Schrauben',
          images: [
            {
              format: 'thumbnail',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wyMzE0fGltYWdlL2pwZWd8YURoaUwyZ3lZaTg0TnprMk1qZ3lPVGM0TXpNMHxkYmQ5MDRjNzU5ZjcyMTljMDZlZDFiMzRkMGI4Nzc0YzNjNjc2ODNjMGU5MzY5NTA5NjkwNDk2ODliYWFjN2Zl',
            },
            {
              format: 'product',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wxMDUyN3xpbWFnZS9qcGVnfGFHUmpMMmhtWVM4NE56azJNalUyTkRNMk1qVTB8NDRkMTA4MzgyYTJkZjg3OGU5Y2NiNzliYjM0YmI1NTRiZGNhOGRkNjk3NGQ5YTVlZDJmODg1ZTY3NmZmNzY5Yg',
            },
          ],
          manufacturer: 'Einhell',
          name: 'Akkuschrauber BT-SD 4,8 F',
          price: {
            value: 12,
          },
          priceRange: {},
          stock: { isValueRounded: false, stockLevelStatus: 'inStock' },
          summary: 'Akkuschrauber BT-SD 4,8 F',
        },
      },
      {
        entryNumber: 2,
        quantity: 250,
        basePrice: {
          value: 34,
        },
        totalPrice: { value: 8500 },
        product: {
          code: '3788616',
          description:
            'Leistungsfähiger Trockenmauer-Bohrer mit durchdachtem Design, der leicht zu bedienende Tiefenmesser garantiert eine konstante Bohrtiefe. Sie können den Schraubendreher unter anderem zum Bolzen (mit hoher Geschwindigkeit) von Gips- und Spanplatten verwenden.<br/>Die große Laufruhe des Werkzeugs, die elektronische Geschwindigkeitssteuerung und das ergonomische Design ermöglichen ein ermüdungsfreies Arbeiten.<br/><br/>Funktionen:<br/>– Elektronische Geschwindigkeitskontrolle mit vorab auswählbaren Einstellungen<br/>– Frei wählbare Rotationsrichtung links/rechts <br/>– Getriebegehäuse aus Metall <br/>– Werkzeugunterstützung für 1¼" (6,35 mm) Innensechskant <br/>– Tiefenmesser <br/>– Feststelltaste für Dauerbetrieb',
          images: [
            {
              format: 'thumbnail',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wyMjU0fGltYWdlL2pwZWd8YURNd0wyZ3haaTg0TnprMk1qZ3pNRFF6T0Rjd3xkZDJhMTU0MjQzZDNiNjQyNGZlMmE1ZWRmNWU1NTM2ZjczODYxNjg1OTE1OTcxOTIyNjdkNzAzMTkyY2M3NzAz',
            },
            {
              format: 'product',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wxMDgyN3xpbWFnZS9qcGVnfGFESTVMMmc1Wmk4NE56azJNalUxT0RjNU1UazR8OWM5MGNjNzBmNzVjMTMwZDJmODYwM2Y3NjE3MTliMjZlYzJjZTY1OTFmY2Q1MzEyZTY3OTE0MTljYmQ1YzEwYQ',
            },
          ],
          manufacturer: 'Einhell',
          name: 'BT-DY 720 E',
          price: {
            value: 34,
          },
          priceRange: {},
          stock: { isValueRounded: false, stockLevelStatus: 'inStock' },
          summary: 'Trockenmauer-Schraubendreher BT-DY 720 E',
        },
      },
      {
        entryNumber: 3,
        quantity: 100,
        basePrice: {
          value: 98,
        },
        totalPrice: { value: 9800 },
        product: {
          code: '3788618',
          description:
            'Dieser Lithium-Ionen-Schraubendreher ist die optimale Lösung für jeden Heimwerker. Aufgrund seiner handlichen Größe ist er universell einsetzbar. Der Akku mit Lithium-Ionen-Technologie entlädt sich nicht mehr automatisch und kann unabhängig vom Ladezustand des Akkus jederzeit aufgeladen werden (kein Memory-Effekt). Zusätzlich hat das RT-SD 3,6 Li einen 3-stufigen Ladestandsanzeiger, ein helles LED-Licht und einen praktischen magnetischen Schraubenhalter am Gerät.<br/><br/>Funktionen<br/>– Schraubendreher mit Lithium-Ionen <br/> 3-stufige LED-Akkuanzeige <br/> – Ladekontrollleuchte <br/>– Rechts-/Linksdrehung <br/>– LED-Leuchte <br/>– Magnetischer Schraubenhalter <br/>– Robustes Getriebegehäuse aus Metall <br/>– 4 Bits <br/>– Gürteltasche <br/>– Sicherheitsschlaufe',
          images: [
            {
              format: 'thumbnail',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wxMjE1MHxpbWFnZS9qcGVnfGFEVTJMMmd5T1M4NE56azJNamd6TXpNNE56Z3l8OTgxMTY1MTJjOTFhZDNiOGZlNjk2YWFkODY2ZDY5MjlkYzBiN2VkNmRiYWUyNzEyYmE0NmRlY2NjMThlZWFmMQ',
            },
            {
              format: 'product',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wyMzc2NHxpbWFnZS9qcGVnfGFEa3hMMmhoTWk4NE56azJNalUxT1RjM05UQXl8ZWRjMGE0NmMzZjFkZGQ3YTk1NTU2NGEyYzE3MWIxMDM0ZTAzMTRmMzZkOTg0ZWNmYWVlNTU0OGIxZWUzYmQ5ZQ',
            },
          ],
          manufacturer: 'Einhell',
          name: 'Akkuschrauber RT-SD 3,6 Li',
          price: {
            value: 98,
          },
          priceRange: {},
          stock: { isValueRounded: false, stockLevelStatus: 'inStock' },
          summary: 'Akkuschrauber RT-SD 3,6 Li',
        },
      },
      {
        entryNumber: 4,
        quantity: 500,
        basePrice: {
          value: 11,
        },
        totalPrice: { value: 5500 },
        product: {
          code: '3788611',
          description:
            'Der Akkuschrauber BT-SD 3,6 F ist die ideale und praktische Lösung für alle Heimwerker. Mit den mitgelieferten Bits ist der Akkuschrauber BT-CD 3,6 F universell einsetzbar.<br/><br/><b>Funktionen:</b><br/>– Schwenkbarer Griff </b>– Arretiertaste für den Griff </b>– Beidseitige Rotation </b>– Ladestandsanzeige </b>– Ladegerät</b><br/><b>– Lieferumfang: </b><br/>– Magnetischer Bithalter<br/>– Adapter für Steckschlüsselbits<br/>– 28 verschiedene Schraubendreherbits<br/>– 8 Steckschlüsselbits<br/>– Transport- und Lagerkoffer',
          images: [
            {
              format: 'thumbnail',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wxOTU0fGltYWdlL2pwZWd8YUdVd0wyZ3laUzg0TnprMk1qZ3lPRGd3TURNd3wyMjM2MjM1OTIzMzBlZDNhODQxYWIyMGU0MzBiYWY1NjNmMjc2NTczMDhhODI0ZWM0MzQ5ZDg5ZTMxZDc2YWVj',
            },
            {
              format: 'product',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3w3NzQxfGltYWdlL2pwZWd8YURBMEwyZzVOUzg0TnprMk1qVTFOVGcwTWpnMnw1NTAyNzllZjNhYzU5ZThhZjYzN2EyN2VjOWI1NzhmYTA4ZTZiMjJmNWI0MDVkMWYxNmRlYWIyNzdhN2M1OWYz',
            },
          ],
          manufacturer: 'Einhell',
          name: 'Akkuschrauber BT-SD 3,6 F',
          price: {
            value: 11,
          },
          priceRange: {},
          stock: { isValueRounded: false, stockLevelStatus: 'inStock' },
          summary: 'Akkuschrauber BT-SD 3,6 F',
        },
      },
    ],
    totalItems: 4,
    totalUnitCount: 1350,
    subTotal: { value: 29800 },
    totalDiscounts: { value: 0 },
    totalTax: { value: 0 },
    totalPriceWithTax: { value: 29800 },
    deliveryAddress: {
      id: '0005678',
      street1: 'Hasenheide 109',
      city: 'Berlin',
      countryCode: 'DE',
      postalcode: '10967',
      defaultAddress: true,
      shippingAddress: true,
      visible: true,
    },
    deliveryMode: {
      code: 'dhl-standard',
      name: 'DHL Standard',
      deliveryCost: { value: 0.1 },
    },
    totalPrice: { value: 32780 },
    purchaseOrderNumber: 'po165642',
    creationTime: '2024-10-17T18:04:09.969Z',
    expirationTime: '2024-11-16T18:04:09.969Z',
    updateTime: '2024-11-07T18:04:39.628Z',
  },
  {
    code: '0000539',
    status: 'approved',
    guid: 'e0510389',
    orgUnit: '0005678',
    entries: [
      {
        entryNumber: 1,
        quantity: 250,
        basePrice: {
          value: 34,
        },
        totalPrice: { value: 8500 },
        product: {
          code: '4567131',
          description:
            '– Ladestandsanzeige über LED<br/>– Lock-on-Schalter<br/>– Ergonomisches Werkzeugdesign mit Softgrip',
          images: [
            {
              format: 'thumbnail',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wyNTI3fGltYWdlL2pwZWd8YURNNEwyZzRZeTg0TnprMk1qazVNekk1TlRZMnwyM2UyYzBmMTk4NzI1NTVkZjJmYWI1MGUyNjQxYWVlYTkwNDNhNzFjNmRmNGJlNWUxOWRhNmNkYWY1NzJiMWY1',
            },
            {
              format: 'product',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wxMjczOHxpbWFnZS9qcGVnfGFERTFMMmhtTUM4NE56azJNamN5TXpZeE5UQXl8NzVkODQxMjEzMTVjOTA3M2U0MGY1MWU2OGM3MDIwNzA1MDA4YjEzZDYxNGYzNGUyZTQ4ZDcyMDQ3YzMyNjA5ZQ',
            },
          ],
          manufacturer: 'Bosch',
          name: 'XEO',
          price: {
            value: 34,
          },
          priceRange: {},
          stock: { isValueRounded: false, stockLevelStatus: 'inStock' },
          summary: 'Xeo Universal-Akkuschneider',
        },
      },
      {
        entryNumber: 2,
        quantity: 100,
        basePrice: {
          value: 78,
        },
        totalPrice: { value: 7800 },
        product: {
          code: '4567134',
          description:
            '– Mit dem Bosch SDS-System: schneller und einfacher Sägeblattwechsel ohne Werkzeug über eine Schiebetaste.<br/>– Bosch Electronic Schlagzahlsteuerung: „beschleunigt“ von Null auf Maximum über den Auslöseschalter – für materialspezifisches Arbeiten<br/>- Integrierter',
          images: [
            {
              format: 'thumbnail',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wyNDIxfGltYWdlL2pwZWd8YURCbEwyZzRPQzg0TnprMk1qazVORGt6TkRBMnxmNWE3ZDc2MjU0YWJhYzEyODc3NzI0NWE2YzlmNzUzNDViZTRmYjVhYTAwNzBiMDlmNzM3NjEyNDIwNWMxZTAx',
            },
            {
              format: 'product',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wxMjMwMnxpbWFnZS9qcGVnfGFERXpMMmhtTXk4NE56azJNamN5TkRJM01ETTR8ZmIxMTQwZTYwODkxNjNlZTMyYzJmNmZmOGFiYmRmZThhMWZjNGZlMzc4Nzk0N2NmNDAxNzIyZWI3MTJkZWJhNQ',
            },
          ],
          manufacturer: 'Bosch',
          name: 'PFZ 500 E',
          price: {
            value: 78,
          },
          priceRange: {},
          stock: { isValueRounded: false, stockLevelStatus: 'inStock' },
          summary: 'PFZ 500 E, Allzwecksäge',
        },
      },
      {
        entryNumber: 3,
        quantity: 250,
        basePrice: {
          value: 12,
        },
        totalPrice: { value: 3000 },
        product: {
          code: '4567133',
          description:
            '– Zweiteilige Schleifplatte: Für optimale Ausnutzung des Schleifpapiers kann die Delta-Spitze von Schleifpapier und Schleifplatte leicht gelöst und gedreht werden<br/>– Anschluss für Staubfänger',
          images: [
            {
              format: 'thumbnail',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wyMzE2fGltYWdlL2pwZWd8YURZMUwyZzRPQzg0TnprMk1qazVORFl3TmpNNHxhOTM4NjM5MzQzN2NiZTEzMDIyZTZkMTg1M2YyNTFiOWYxNzQzZTBjNjhiYzIxYmQ4YjYyMGY2ZWQyZDA5YTM0',
            },
            {
              format: 'product',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wxMTcyMXxpbWFnZS9qcGVnfGFEa3hMMmhtWVM4NE56azJNamN5TmpnNU1UZ3l8YzIzMmViOTRiNDczNWM2MTA3YmIwNGZhZGZhNThiMTAzYjk0ZTczZTc3YTQxNjViYjI3NWUwZjU0ZjNmOTIwNA',
            },
          ],
          manufacturer: 'Bosch',
          name: 'PSM 80 A',
          price: {
            value: 12,
          },
          priceRange: {},
          stock: { isValueRounded: false, stockLevelStatus: 'inStock' },
          summary: 'PSM 80 A, Multi-Schleifer',
        },
      },
      {
        entryNumber: 4,
        quantity: 100,
        basePrice: {
          value: 74,
        },
        totalPrice: { value: 7400 },
        product: {
          code: '4567130',
          description:
            '– Das Zubehör kann in unterschiedlichen Winkeln angebracht werden, was das Arbeiten in schwer zugänglichen Bereichen und in Ecken erleichtert<br/>– Softgrip, kompaktes Gehäuse und optimale Ergonomie für sichere Führung und kraftsparendes Arbeiten<br/>– Staubauslass – für Staub',
          images: [
            {
              format: 'thumbnail',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wxMDM4NHxpbWFnZS9qcGVnfGFETTFMMmc0Wmk4NE56azJNams1TWpZME1ETXd8ZDAxOGQ5YTExNzFkMmNmYWVlNDAzNWYyMTJlYmM0ZjA2ODk5NjQ1MjdiZjdhNjZhYTFkZDZhNjRjOThmNGUwYQ',
            },
            {
              format: 'product',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wxOTMzOXxpbWFnZS9qcGVnfGFEY3lMMmc1WVM4NE56azJNamN4T1RNMU5URTR8YjQ1NDk2MGI5YmE1ZDgzNmRiZmQ0ZTM5ZDczZGUxZjA0MmE3Mzk1YjQ0ZTBlOTg1OWQ2MDc1ZmY3N2MwMWQwNw',
            },
          ],
          manufacturer: 'Bosch',
          name: 'PMF 180 E',
          price: {
            value: 74,
          },
          priceRange: {},
          stock: { isValueRounded: false, stockLevelStatus: 'inStock' },
          summary: 'PMF 180 E Multifunktions-Werkzeug',
        },
      },
    ],
    totalItems: 4,
    totalUnitCount: 700,
    subTotal: { value: 26700 },
    totalDiscounts: { value: 0 },
    totalTax: { value: 0 },
    totalPriceWithTax: { value: 26700 },
    deliveryAddress: {
      id: '0005678',
      street1: 'Hasenheide 109',
      city: 'Berlin',
      countryCode: 'DE',
      postalcode: '10967',
      defaultAddress: true,
      shippingAddress: true,
      visible: true,
    },
    deliveryMode: {
      code: 'dhl-standard',
      name: 'DHL Standard',
      deliveryCost: { value: 0.1 },
    },
    totalPrice: { value: 29370 },
    purchaseOrderNumber: 'po288322',
    creationTime: '2024-09-16T19:08:57.435Z',
    expirationTime: '2024-10-16T19:08:57.435Z',
    updateTime: '2024-10-07T19:09:52.986Z',
  },
  {
    code: '0000408',
    status: 'saved',
    guid: '4f2ec489',
    orgUnit: '0001234',
    entries: [
      {
        entryNumber: 1,
        quantity: 50,
        basePrice: {
          value: 117,
        },
        totalPrice: { value: 5850 },
        product: {
          code: '3887119',
          description:
            'Variable speed control switch with speed control dial<br/>Forward / Reverse change over push button<br/>Soft grip handle for increased comfort<br/>Compact and lightweight design<br/>Powerful 460 watt motor<br/>Robust construction<br/>10mm keyless chuck',
          images: [
            {
              format: 'thumbnail',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wzMDI1fGltYWdlL2pwZWd8YUdVMEwyZ3paQzg0TnprMk1qazFNREEwTVRrd3wyM2Y5OTFmNmI2MmQzMzk0ZjQzMjJhNDkzMDhmODgzMTNiOWZmYzQ5YThhOWVlY2U0YWFkMWY3MjFhZDRhNmUx',
            },
            {
              format: 'product',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wxNTQ4N3xpbWFnZS9qcGVnfGFEUTJMMmd6T0M4NE56azJNalkzTlRjM016YzB8MTZlY2UwMzQxYjhkZmU1YjkzMjc0YmU4ZWQ5NmFmZGMxNjEzYmRhYTgzZmZkODRjZmRlMjAzMWM2ZjgxMjkxMg',
            },
          ],
          manufacturer: 'Hitachi',
          name: 'D10VC2',
          price: {
            value: 117,
          },
          priceRange: {},
          stock: { isValueRounded: false, stockLevelStatus: 'inStock' },
          summary: 'D10VC2',
        },
      },
      {
        entryNumber: 2,
        quantity: 25,
        basePrice: {
          value: 205,
        },
        totalPrice: { value: 5125 },
        product: {
          code: '3887125',
          description:
            'The new series of Industrial quality Hitachi Jigsaws incorporate our aggressive cyber design<br/>D-Handle<br/>Variable Speed<br/>Tool-less blade change<br/>Chip guard<br/>Splinter guard<br/>All alloy base<br/>Dust collector<br/>Built in LED light<br/>4 stage orbital action - 0 to III enables rapid and accurate cutting',
          images: [
            {
              format: 'thumbnail',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3w0MzQwfGltYWdlL2pwZWd8YUdOa0wyZ3pPUzg0TnprMk1qazFNVFk0TURNd3xkNjJlMGJiY2E3NTg1MDkzMzkyZjVhMTU1YmRlNmFjOTdkYTM5ODQxZGY5YWNmMjQ2M2Y4YjdmMzc0YWQ1YzAw',
            },
            {
              format: 'product',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wyMzE4NnxpbWFnZS9qcGVnfGFHWTRMMmc1TXk4NE56azJNalk0TVRNME5ETXd8Zjg4MzcwYWRiYjAxZGU5ZTlmZmE4MWUzMTk3MmE4NmRiOGEzN2Y0YzkwMTI1YzBhMmE3ZTJhM2UxOThhMDU1ZQ',
            },
          ],
          manufacturer: 'Hitachi',
          name: 'CJ110MV',
          price: {
            value: 205,
          },
          priceRange: {},
          stock: { isValueRounded: false, stockLevelStatus: 'inStock' },
          summary: 'CJ110MV',
        },
      },
      {
        entryNumber: 3,
        quantity: 75,
        basePrice: {
          value: 61,
        },
        totalPrice: { value: 4575 },
        product: {
          code: '3887121',
          description:
            '13mm keyless chuck for quick and easy replacement of accessories<br/>Ball and needle bearing construction<br/>Standard with carry case<br/>Powerful 530 watt motor<br/>Variable speed reverse<br/>Comfortable grip',
          images: [
            {
              format: 'thumbnail',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wyNDQ5fGltYWdlL2pwZWd8YURkakwyZ3pZUzg0TnprMk1qazFNVEF5TkRrMHxjY2Y1YWRjYmViYmE0OGZmZjgwODg4YTM0MWE0MGVlZWI1YWY2NDU3MTgzYTk0ZTg5N2YzYTZkM2IxODY0ZTU1',
            },
            {
              format: 'product',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wxMjUwOHxpbWFnZS9qcGVnfGFEVTNMMmd6WWk4NE56azJNalkzTmpReU9URXd8YTM2NjAyZTU4OWU1M2EwMjFmMDg3NjcyZjU2MTAxMGVhNjA2OTAzZWVhZTY5MjUyY2FkMTYwNDBmMGE4YjAwYw',
            },
          ],
          manufacturer: 'Hitachi',
          name: 'FDV16VB2',
          price: {
            value: 61,
          },
          priceRange: {},
          stock: { isValueRounded: false, stockLevelStatus: 'inStock' },
          summary: 'FDV16VB2',
        },
      },
      {
        entryNumber: 4,
        quantity: 25,
        basePrice: {
          value: 240,
        },
        totalPrice: { value: 6000 },
        product: {
          code: '3887120',
          description:
            'Adjustable handles for comfortable grip<br/>Built for high torque applications<br/>Powerful 720 watt motor<br/>Triple reduction gearing<br/>Keyed chuck<br/>Reversible',
          images: [
            {
              format: 'thumbnail',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wyODUzfGltYWdlL2pwZWd8YURNMkwyZzRPQzg0TnprMk1qazBPVGN4TkRJeXwwNWFiNGRlYjc0ZTRjZWQ4NTM5Y2U4NTFjZDM4YTMxMTcxNzUyNmIxYzI0YjFhMjRmMDMwZGUxOWYwYzQ1NDll',
            },
            {
              format: 'product',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wxNTIxM3xpbWFnZS9qcGVnfGFEQXdMMmd6WWk4NE56azJNalkzTmpFd01UUXl8ZmFiODM4Mzg4M2ZmNzIwOTNmNmZlMjY1YmY5NzI1OTBmZDIxZjU3NjAwZDNiNGM3ZDEyY2Y3MDk0ZTZmMTdjMA',
            },
          ],
          manufacturer: 'Hitachi',
          name: 'D13',
          price: {
            value: 240,
          },
          priceRange: {},
          stock: { isValueRounded: false, stockLevelStatus: 'inStock' },
          summary: 'D13',
        },
      },
    ],
    totalItems: 4,
    totalUnitCount: 175,
    subTotal: { value: 21550 },
    totalDiscounts: { value: 0 },
    totalTax: { value: 3232.5 },
    totalPriceWithTax: { value: 24782.5 },
    deliveryAddress: {
      id: '0001234',
      street1: '2709 Woodburn Ave',
      city: 'Cincinatti',
      stateOrProvince: 'OH',
      countryCode: 'US',
      postalcode: '45202',
      defaultAddress: true,
      shippingAddress: true,
      visible: true,
    },
    deliveryMode: {
      code: 'fedex-standard',
      name: 'FedEx Standard',
      deliveryCost: { value: 0.125 },
    },
    totalPrice: { value: 27476.25 },
    purchaseOrderNumber: 'po904791',
    creationTime: '2025-01-13T20:29:09.386Z',
    expirationTime: '2025-02-12T20:29:09.386Z',
    updateTime: '2025-01-19T20:29:52.839Z',
  },
  {
    code: '0000516',
    status: 'submitted',
    guid: '4f2ec489',
    orgUnit: '0001234',
    entries: [
      {
        entryNumber: 1,
        quantity: 75,
        basePrice: {
          value: 78,
        },
        totalPrice: { value: 5850 },
        product: {
          code: '4567134',
          description:
            '- With Bosch SDS system: fast and convenient saw blade changes Without tools and simply at the slide of a button<br/>- Bosch Electronic stroke rate control: "accelerate" from 0 – max. using the trigger switch for material-specific working<br/>- Integrated',
          images: [
            {
              format: 'thumbnail',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wyNDIxfGltYWdlL2pwZWd8YURCbEwyZzRPQzg0TnprMk1qazVORGt6TkRBMnxmNWE3ZDc2MjU0YWJhYzEyODc3NzI0NWE2YzlmNzUzNDViZTRmYjVhYTAwNzBiMDlmNzM3NjEyNDIwNWMxZTAx',
            },
            {
              format: 'product',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wxMjMwMnxpbWFnZS9qcGVnfGFERXpMMmhtTXk4NE56azJNamN5TkRJM01ETTR8ZmIxMTQwZTYwODkxNjNlZTMyYzJmNmZmOGFiYmRmZThhMWZjNGZlMzc4Nzk0N2NmNDAxNzIyZWI3MTJkZWJhNQ',
            },
          ],
          manufacturer: 'Bosch',
          name: 'PFZ 500 E',
          price: {
            value: 78,
          },
          priceRange: {},
          stock: { isValueRounded: false, stockLevelStatus: 'inStock' },
          summary: 'PFZ 500 E, All Purpose saw',
        },
      },
      {
        entryNumber: 2,
        quantity: 100,
        basePrice: {
          value: 34,
        },
        totalPrice: { value: 3400 },
        product: {
          code: '4567131',
          description:
            '- Charge level indicator by means of LED<br/>- Lock-on switch<br/>- Ergonomic tool design with softgrip',
          images: [
            {
              format: 'thumbnail',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wyNTI3fGltYWdlL2pwZWd8YURNNEwyZzRZeTg0TnprMk1qazVNekk1TlRZMnwyM2UyYzBmMTk4NzI1NTVkZjJmYWI1MGUyNjQxYWVlYTkwNDNhNzFjNmRmNGJlNWUxOWRhNmNkYWY1NzJiMWY1',
            },
            {
              format: 'product',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wxMjczOHxpbWFnZS9qcGVnfGFERTFMMmhtTUM4NE56azJNamN5TXpZeE5UQXl8NzVkODQxMjEzMTVjOTA3M2U0MGY1MWU2OGM3MDIwNzA1MDA4YjEzZDYxNGYzNGUyZTQ4ZDcyMDQ3YzMyNjA5ZQ',
            },
          ],
          manufacturer: 'Bosch',
          name: 'XEO',
          price: {
            value: 34,
          },
          priceRange: {},
          stock: { isValueRounded: false, stockLevelStatus: 'inStock' },
          summary: 'Xeo Cordless Universal Cutter',
        },
      },
      {
        entryNumber: 3,
        quantity: 100,
        basePrice: {
          value: 12,
        },
        totalPrice: { value: 1200 },
        product: {
          code: '4567133',
          description:
            '- Two-piece sanding plate: for optimum utilisation of the sanding paper, the delta tip of the sanding paper and of the sanding plate can be effortlessly detached and rotated<br/>- Connection for dust extraction',
          images: [
            {
              format: 'thumbnail',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wyMzE2fGltYWdlL2pwZWd8YURZMUwyZzRPQzg0TnprMk1qazVORFl3TmpNNHxhOTM4NjM5MzQzN2NiZTEzMDIyZTZkMTg1M2YyNTFiOWYxNzQzZTBjNjhiYzIxYmQ4YjYyMGY2ZWQyZDA5YTM0',
            },
            {
              format: 'product',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wxMTcyMXxpbWFnZS9qcGVnfGFEa3hMMmhtWVM4NE56azJNamN5TmpnNU1UZ3l8YzIzMmViOTRiNDczNWM2MTA3YmIwNGZhZGZhNThiMTAzYjk0ZTczZTc3YTQxNjViYjI3NWUwZjU0ZjNmOTIwNA',
            },
          ],
          manufacturer: 'Bosch',
          name: 'PSM 80 A',
          price: {
            value: 12,
          },
          priceRange: {},
          stock: { isValueRounded: false, stockLevelStatus: 'inStock' },
          summary: 'PSM 80 A, Multi-sander',
        },
      },
      {
        entryNumber: 4,
        quantity: 75,
        basePrice: {
          value: 74,
        },
        totalPrice: { value: 5550 },
        product: {
          code: '4567130',
          description:
            '- Accessories can be attached at different angles: for maximum accessibility in hard-to-reach areas and close to corners<br/>- Softgrip, compact housing and optimum ergonomics for safe guidance and effortless working<br/>- Dust extraction port – for dust-',
          images: [
            {
              format: 'thumbnail',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wxMDM4NHxpbWFnZS9qcGVnfGFETTFMMmc0Wmk4NE56azJNams1TWpZME1ETXd8ZDAxOGQ5YTExNzFkMmNmYWVlNDAzNWYyMTJlYmM0ZjA2ODk5NjQ1MjdiZjdhNjZhYTFkZDZhNjRjOThmNGUwYQ',
            },
            {
              format: 'product',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wxOTMzOXxpbWFnZS9qcGVnfGFEY3lMMmc1WVM4NE56azJNamN4T1RNMU5URTR8YjQ1NDk2MGI5YmE1ZDgzNmRiZmQ0ZTM5ZDczZGUxZjA0MmE3Mzk1YjQ0ZTBlOTg1OWQ2MDc1ZmY3N2MwMWQwNw',
            },
          ],
          manufacturer: 'Bosch',
          name: 'PMF 180 E',
          price: {
            value: 74,
          },
          priceRange: {},
          stock: { isValueRounded: false, stockLevelStatus: 'inStock' },
          summary: 'PMF 180 E Multifunction tool',
        },
      },
    ],
    totalItems: 4,
    totalUnitCount: 350,
    subTotal: { value: 16000 },
    totalDiscounts: { value: 0 },
    totalTax: { value: 2400 },
    totalPriceWithTax: { value: 18400 },
    deliveryAddress: {
      id: '0001234',
      street1: '2709 Woodburn Ave',
      city: 'Cincinatti',
      stateOrProvince: 'OH',
      countryCode: 'US',
      postalcode: '45202',
      defaultAddress: true,
      shippingAddress: true,
      visible: true,
    },
    deliveryMode: {
      code: 'fedex-standard',
      name: 'FedEx Standard',
      deliveryCost: { value: 0.125 },
    },
    totalPrice: { value: 20400 },
    purchaseOrderNumber: 'po203501',
    creationTime: '2024-12-16T20:25:47.107Z',
    expirationTime: '2025-01-15T20:25:47.107Z',
    updateTime: '2025-01-06T20:26:33.143Z',
  },
  {
    code: '0000570',
    status: 'approved',
    guid: '4f2ec489',
    orgUnit: '0001234',
    entries: [
      {
        entryNumber: 1,
        quantity: 75,
        basePrice: {
          value: 59,
        },
        totalPrice: { value: 4425 },
        product: {
          code: '3881037',
          images: [
            {
              format: 'thumbnail',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wxOTM3fGltYWdlL2pwZWd8YURNMkwyZ3pOaTg0TnprMk1qa3dOemMzTVRFNHwwNjNiNjg2NDllNWRlNmFhN2JhMmQwM2M0MzE3MjQ0ZDZjMTVmMjJhOTAxNjJmNzdmMDc3YzAxOWM5MDVmN2Jm',
            },
            {
              format: 'product',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3w3NzUwfGltYWdlL2pwZWd8YURVM0wyZzRaQzg0TnprMk1qWXpORFE0TmpBMnw1MzlkOTEwN2FmODhkNjBmYTQxMTg3NTlkMzUyYjcyZDRiOGQyMGM3OWNiNjlkYzU2NTkwM2YzMmZiMDNhMGMz',
            },
          ],
          manufacturer: 'Skil',
          name: 'Cordless drill/driver 2006',
          price: {
            value: 59,
          },
          priceRange: {},
          stock: { isValueRounded: false, stockLevelStatus: 'inStock' },
        },
      },
      {
        entryNumber: 2,
        quantity: 75,
        basePrice: {
          value: 75,
        },
        totalPrice: { value: 5625 },
        product: {
          code: '3881038',
          images: [
            {
              format: 'thumbnail',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wxOTM3fGltYWdlL2pwZWd8YURoa0wyZ3pOaTg0TnprMk1qa3dOelEwTXpVd3w4MGU4ZWUwZjY1NGE0NzAwNTE3OGVjYzlhMzk3NTVhZjI1ZDYwMDFmOGFlOTAyNzBjMjA4NDZhOTAxMDM0ZmUy',
            },
            {
              format: 'product',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3w3NzUwfGltYWdlL2pwZWd8YURrNEwyZzRPUzg0TnprMk1qWXpNekUzTlRNMHw0NjQ1ZTVjOWJjNDU4MmY1YmJjZDQwNDY4ZTk1MDg1MTY1MTkxOWExOWQyMmIxYjkyNjUzZjM0NzI2YmM4YzA2',
            },
          ],
          manufacturer: 'Skil',
          name: 'Cordless drill/driver 2007',
          price: {
            value: 75,
          },
          priceRange: {},
          stock: { isValueRounded: false, stockLevelStatus: 'inStock' },
        },
      },
      {
        entryNumber: 3,
        quantity: 100,
        basePrice: {
          value: 29,
        },
        totalPrice: { value: 2900 },
        product: {
          code: '3881043',
          images: [
            {
              format: 'thumbnail',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wxOTM3fGltYWdlL2pwZWd8YUdGa0wyZ3hZaTg0TnprMk1qa3hNRGN5TURNd3w1MTdjYjgyZjU2Njg0NDdhNWU3MDM3MWFkZmRlN2MyNGIxNTIzMzA3NjFlMzQxYTBmZmQ1MzNjMTk4MGRiODQx',
            },
            {
              format: 'product',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3w3NzUwfGltYWdlL2pwZWd8YUdZM0wyZzVZUzg0TnprMk1qWXpPRFF4T0RJeXxkM2IxZmE1NmRhNzA5ZjRkZDQzNDUyNWIyYWRiZmJiYzA1MWJmZTMyMDE3NWFmMzBkMWUxODgxNDJmMDI1MWU0',
            },
          ],
          manufacturer: 'Skil',
          name: 'Cordless drill/driver 2005',
          price: {
            value: 29,
          },
          priceRange: {},
          stock: { isValueRounded: false, stockLevelStatus: 'inStock' },
        },
      },
      {
        entryNumber: 4,
        quantity: 75,
        basePrice: {
          value: 58,
        },
        totalPrice: { value: 4350 },
        product: {
          code: '3881060',
          images: [
            {
              format: 'thumbnail',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wxMjUyNXxpbWFnZS9qcGVnfGFHVXpMMmd5T0M4NE56azJNamt4TkRNeU5EYzR8MThjZDM5YTU1MzgxNmJlMTFmMDg4M2MzMDI1Yjk4MTIxN2EyZjQzYTAxNTU5ZTBlZWNjM2YxZGQzNTViYjIyMQ',
            },
            {
              format: 'product',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wyNTA2MnxpbWFnZS9qcGVnfGFETXhMMmhtTUM4NE56azJNalkwTWpNMU1ETTR8OTFkOTYxNmVjYjEyNzFiOGFkNWY3M2Y0ZjI1ZTFiODRjZDJhNzYxMjg4Y2NmNjVjYmJmY2U1YjA0MWE5YjdmNQ',
            },
          ],
          manufacturer: 'Skil',
          name: 'Cordless drill/driver 2027',
          price: {
            value: 58,
          },
          priceRange: {},
          stock: { isValueRounded: false, stockLevelStatus: 'inStock' },
        },
      },
    ],
    totalItems: 4,
    totalUnitCount: 325,
    subTotal: { value: 17300 },
    totalDiscounts: { value: 0 },
    totalTax: { value: 2595 },
    totalPriceWithTax: { value: 19895 },
    deliveryAddress: {
      id: '0001234',
      street1: '2709 Woodburn Ave',
      city: 'Cincinatti',
      stateOrProvince: 'OH',
      countryCode: 'US',
      postalcode: '45202',
      defaultAddress: true,
      shippingAddress: true,
      visible: true,
    },
    deliveryMode: {
      code: 'fedex-standard',
      name: 'FedEx Standard',
      deliveryCost: { value: 0.125 },
    },
    totalPrice: { value: 22057.5 },
    purchaseOrderNumber: 'po226095',
    creationTime: '2024-11-11T20:17:29.833Z',
    expirationTime: '2024-12-11T20:17:29.833Z',
    updateTime: '2024-12-02T20:18:48.411Z',
  },
  {
    code: '0000117',
    status: 'expired',
    guid: '4f2ec489',
    orgUnit: '0001234',
    entries: [
      {
        entryNumber: 1,
        quantity: 75,
        basePrice: {
          value: 117,
        },
        totalPrice: { value: 8775 },
        product: {
          code: '1128762',
          description:
            'The StarTech.com Professional LAN Installation Tool kit provides all the necessary tools to install and test RJ45 networks in a compact, handy, carrying case. Tools included are: a RJ45/11 Crimp tool, a 110/66 Impact Punch Tool, a wire stripper, several RJ45 connectors, and a RJ45 network cable tester with remote loop back plug (same as the StarTech.com REMOTETEST tester).',
          images: [
            {
              format: 'thumbnail',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wyNDk3fGltYWdlL2pwZWd8YUdJMEwyZ3lNaTg0TnprMk1qYzFNREUxTnpFd3xlN2FjMDc3N2YyNDQ3NmFkYmJhODllZDkwOWRlMGVhMzVhNGE0NjQ2Y2Y4NDZhNDA2ZWEyY2Q4OTdhZjQ0Yjk4',
            },
            {
              format: 'product',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wxMjkwMHxpbWFnZS9qcGVnfGFEVTJMMmhoTWk4NE56azJNalEzT0RFNE1qY3d8ZDUwNjNlMThjMzQyYTAyODNkZmE2NDIwOWIwOTdjZWE4NmIzMzg5ZTM0MWRkYzliZGJiMmY1NDM4M2FmZjgzYg',
            },
          ],
          manufacturer: 'StarTech.com',
          name: 'Professional Network Installer <em class="search-results-highlight">Tool</em> Kit',
          price: {
            value: 117,
          },
          priceRange: {},
          stock: { isValueRounded: false, stockLevelStatus: 'inStock' },
          summary:
            'Professional Network Installer <em class="search-results-highlight">Tool</em> Kit - Installation Kit',
        },
      },
      {
        entryNumber: 2,
        quantity: 50,
        basePrice: {
          value: 39,
        },
        totalPrice: { value: 1950 },
        product: {
          code: '693923',
          description:
            "This 19-piece PC toolkit provides you with everything you'll need to repair and maintain today's computers. Designed to be used in offices or by computer services people, the carrying case is made from vinyl and is zippered to keep everything in one place.",

          images: [
            {
              format: 'thumbnail',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wzOTc3fGltYWdlL2pwZWd8YURGa0wyZ3lOaTg0TnprMk1qYzFNVEUwTURFMHw4ZDAzMmM0NTdlOWY5ZTA0OGYzMTA0ZDU4NmY4YjQyYjk1OGNhY2QxMTkwYmRhZTQyMzYyZDg0OTc1NDZiOTQ2',
            },
            {
              format: 'product',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wyMjMxM3xpbWFnZS9qcGVnfGFHWXdMMmc1WWk4NE56azJNalEzTmpVME5ETXd8MTQ3OGNhYjk5NzYwOWRhNDk0Mjc0MDVkMjU3OGYyYzJiOTMwZjZjYmJhMWY4YTIwM2JjMmI1OWJjZDQyOTgzMg',
            },
          ],
          manufacturer: 'StarTech.com',

          name: 'P.C. Service Kit / C.S.A. Soldering Iron',
          price: {
            value: 39,
          },
          priceRange: {},
          stock: { isValueRounded: false, stockLevelStatus: 'inStock' },
          summary: 'P.C. Service Kit / C.S.A. Soldering Iron',
        },
      },
      {
        entryNumber: 3,
        quantity: 50,
        basePrice: {
          value: 39,
        },
        totalPrice: { value: 1950 },
        product: {
          code: '693923',
          description:
            "This 19-piece PC toolkit provides you with everything you'll need to repair and maintain today's computers. Designed to be used in offices or by computer services people, the carrying case is made from vinyl and is zippered to keep everything in one place.",

          images: [
            {
              format: 'thumbnail',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wzOTc3fGltYWdlL2pwZWd8YURGa0wyZ3lOaTg0TnprMk1qYzFNVEUwTURFMHw4ZDAzMmM0NTdlOWY5ZTA0OGYzMTA0ZDU4NmY4YjQyYjk1OGNhY2QxMTkwYmRhZTQyMzYyZDg0OTc1NDZiOTQ2',
            },
            {
              format: 'product',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wyMjMxM3xpbWFnZS9qcGVnfGFHWXdMMmc1WWk4NE56azJNalEzTmpVME5ETXd8MTQ3OGNhYjk5NzYwOWRhNDk0Mjc0MDVkMjU3OGYyYzJiOTMwZjZjYmJhMWY4YTIwM2JjMmI1OWJjZDQyOTgzMg',
            },
          ],
          manufacturer: 'StarTech.com',

          name: 'P.C. Service Kit / C.S.A. Soldering Iron',
          price: {
            value: 39,
          },
          priceRange: {},
          stock: { isValueRounded: false, stockLevelStatus: 'inStock' },
          summary: 'P.C. Service Kit / C.S.A. Soldering Iron',
        },
      },
      {
        entryNumber: 4,
        quantity: 50,
        basePrice: {
          value: 23.5,
        },
        totalPrice: { value: 1175 },
        product: {
          code: '3803058',
          description:
            '23-piece PC Service Set Professional. Contents: 3 way ratsch driver, extension for 3 way ratsch driver, 10 pcs bits and 2 pcs nut set, 4.5" diagonal pliers, 5" long nose pliers, IC-inserter, IC-extractor, 3 claw tweezers, assembly tweezers, screwdriver-slotted 1/8 ".',

          images: [
            {
              format: 'thumbnail',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wyODA3fGltYWdlL2pwZWd8YURrMkwyaG1ZeTg0TnprMk1qZzFNekEwT0RZeXxlZjQ2ODk1NjRmZTNkMjJkY2U4Yzg0ZDRmNDY2YjljOGE2ZDRlNDUwYjYzOGJlZTYxNmRhMGEwZGY4ZTEzYmM5',
            },
            {
              format: 'product',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wxNTUyNnxpbWFnZS9qcGVnfGFHTXlMMmd6WlM4NE56azJNalU0TURjME5qVTB8MWQ5MTJmYzAyYTEyOTc0YjNlZGE2ODA5MmRhMmQxN2ZkZTQ4NGUzMTc4ZGNmY2EzNmEzMGRlNWM5MTBlYjliMA',
            },
          ],
          manufacturer: 'Ednet',

          name: 'PC Service Set Professional',
          price: {
            value: 23.5,
          },
          priceRange: {},
          stock: { isValueRounded: false, stockLevelStatus: 'inStock' },
          summary: 'PC Service Set Professional',
        },
      },
    ],
    totalItems: 4,
    totalUnitCount: 225,
    subTotal: { value: 13850 },
    totalDiscounts: { value: 0 },
    totalTax: { value: 2077.5 },
    totalPriceWithTax: { value: 15927.5 },
    deliveryAddress: {
      id: '0001234',
      street1: '2709 Woodburn Ave',
      city: 'Cincinatti',
      stateOrProvince: 'OH',
      countryCode: 'US',
      postalcode: '45202',
      defaultAddress: true,
      shippingAddress: true,
      visible: true,
    },
    deliveryMode: {
      code: 'fedex-standard',
      name: 'FedEx Standard',
      deliveryCost: { value: 0.125 },
    },
    totalPrice: { value: 17658.75 },
    purchaseOrderNumber: 'po902426',
    creationTime: '2024-10-17T18:04:09.969Z',
    expirationTime: '2024-11-16T18:04:09.969Z',
    updateTime: '2024-11-07T18:04:39.628Z',
  },
  {
    code: '0000649',
    status: 'approved',
    guid: '4f2ec489',
    orgUnit: '0001234',
    entries: [
      {
        entryNumber: 1,
        quantity: 25,
        basePrice: {
          value: 80,
        },
        totalPrice: { value: 2000 },
        product: {
          code: '2116266',
          description:
            '-Orbital, detail, random orbit and profile sanding bases permits a wide application range, and maximum usage.<br/>-On board dust extraction collects dust and ensures a clean working environment.<br/>-Cyclonic Dust Canister is clear so the user can see whe',

          images: [
            {
              format: 'thumbnail',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wyODU1fGltYWdlL2pwZWd8YURZM0wyZ3lNUzg0TnprMk1qYzVOak0xT1RrNHxhZjc3NjQ5ZGEwNDUyZDVjOGY1NWFlZWQ4ODg0MjcyZmZmMGNlZjhhMTc4YTM4ZWU0MjdiZGNjOWZjMjRhZWIw',
            },
            {
              format: 'product',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wxNTU1NHxpbWFnZS9qcGVnfGFEVXpMMmhoWXk4NE56azJNalV5TkRNNE5UVTR8YTlhMWIzMWU5NTQyMTA1OTI0MWUyNjFmZmMzYTI5ZTQxMDU4YTg5ZTQ2ODFkMTBlNTk4YjgzZmY4ZDViMjNjNA',
            },
          ],
          manufacturer: 'Black & Decker',

          name: 'KA270K',
          price: {
            value: 80,
          },
          priceRange: {},
          stock: { isValueRounded: false, stockLevelStatus: 'inStock' },
          summary: 'Multi Sander with Cyclonic Dust Canister',
        },
      },
      {
        entryNumber: 2,
        quantity: 50,
        basePrice: {
          value: 36,
        },
        totalPrice: { value: 1800 },
        product: {
          code: '2116274',
          description:
            '-Compact power - powerful 240W motor gets the job done quicker.<br/>-Compact design gets you closer to the work surface for greater control.<br/>-Large orbit size and high sander speed for faster material removal.<br/>-Versatile - Third sheet base sands f',

          images: [
            {
              format: 'thumbnail',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wzMTMzN3xpbWFnZS9qcGVnfGFHSmtMMmd5TVM4NE56azJNamM1TmpBek1qTXd8NjczYjdjZWViOGI2NzAyMzRjYjlhZmQ1ZGJmM2RkNjA4Mjg2OTYwMDg0YTA5OTQwOWJlYjJmYjZhMTUxODE4MQ',
            },
            {
              format: 'product',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3w0MjY4MnxpbWFnZS9qcGVnfGFHRmlMMmhoWXk4NE56azJNalV5TkRBMU56a3d8ZTJhYzJlZjNmZGM1OGZhOWI4NWI2YjRkMGFlYzAxMzQzZTg2ZWVmMzdhZDI1OTA3NGY1N2QxMjk0NThjNjkxNw',
            },
          ],
          manufacturer: 'Black & Decker',

          name: 'KA310 240W <em class="search-results-highlight">1</em>/<em class="search-results-highlight">3</em> Sheet Sander',
          price: {
            value: 36,
          },
          priceRange: {},
          stock: { isValueRounded: false, stockLevelStatus: 'inStock' },
          summary:
            'KA310 240W <em class="search-results-highlight">1</em>/<em class="search-results-highlight">3</em> Sheet Sander',
        },
      },
      {
        entryNumber: 3,
        quantity: 25,
        basePrice: {
          value: 73,
        },
        totalPrice: { value: 1825 },
        product: {
          code: '2116277',
          description:
            '- 24 torque clutch - For perfect screwdriving into a variety of materials with different screws sizes<br/> - Spring Loaded Slide Pack Battery System - For quick and easy battery change and a more secure fit<br/> - Reverse switch for added versatility<br/> - Variable speed - For ultimate finger tip control for all drilling applications',

          images: [
            {
              format: 'thumbnail',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wzMjc4MHxpbWFnZS9qcGVnfGFEazJMMmd4WVM4NE56azJNamM1T0RNeU5qQTJ8NzYzNWZjMDcxZGM2MWE5OGM2YzUxZmFlZjJlNzUxMDM2MGE1MmNmNWJhNTI0Yjk2ZDAyM2IxODExOTBhNWExYQ',
            },
            {
              format: 'product',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3w0MzM0OXxpbWFnZS9qcGVnfGFHUmhMMmhoTlM4NE56azJNalV5TmpBeU16azR8N2UxZmI5NTY2ZGNkNDM1MmViMTVmOTM5MjE0NjE1NDFlNmE0YjA0MjZiMDI5YTkyNDgyZTY0MDRmYjkyMDllZA',
            },
          ],
          manufacturer: 'Black & Decker',

          name: '14.4V Cordless Drill + <em class="search-results-highlight">2</em> batteries',
          price: {
            value: 73,
          },
          priceRange: {},
          stock: { isValueRounded: false, stockLevelStatus: 'inStock' },
          summary: '14.4V Cordless Drill',
        },
      },
      {
        entryNumber: 4,
        quantity: 25,
        basePrice: {
          value: 130,
        },
        totalPrice: { value: 3250 },
        product: {
          code: '2116282',
          description:
            '-850W power - Powerful unit for serious drilling.<br/>-High performance, non slip SDS-Plus chuck for quick accessory changing.<br/>-Powerful Pneumatic Hammer 0-5180 impacts Per minute.<br/>-2.4 Joule of impact energy allows the user to drill into hard mat',

          images: [
            {
              format: 'thumbnail',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wzMzMxfGltYWdlL2pwZWd8YURBeEwyaGxNaTg0TnprMk1qZ3dNRFl4T1RneXwyYTNiYjk2MWRkNDllNzZmY2NiY2E5N2RlNzU0NDI0M2VkNjk5YWEyNDg2YjJlYWUyMzRkYjQ3ZDBlYzZlY2Q0',
            },
            {
              format: 'product',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wxNjE1NXxpbWFnZS9qcGVnfGFEY3lMMmhoTWk4NE56azJNalV5TnpBd056QXl8Zjk5YjFiMDkyZTJlOGM5MmJhZTQzNjZiYWM2NzU2YzE4NGViZWFjOTI0YzgyYzBjZWYxZmJkZDZhOTgzZWZjYg',
            },
          ],
          manufacturer: 'Black & Decker',

          name: 'KD990KA',
          price: {
            value: 130,
          },
          priceRange: {},
          stock: { isValueRounded: false, stockLevelStatus: 'inStock' },
          summary: '850W 2.4J Pneumatic Hammer Drill',
        },
      },
      {
        entryNumber: 5,
        quantity: 25,
        basePrice: {
          value: 63,
        },
        totalPrice: { value: 1575 },
        product: {
          code: '2116283',
          description:
            '-Angled belt design enables you to sand 2 x closer to the edge of adjoining surfaces.<br/>-Powerful 720W motor - Ideal for sanding floor boards, decking and other large surfaces which require greater stock removal.<br/>-Automatic belt tracking to keep the',
          images: [
            {
              format: 'thumbnail',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wzMzgwfGltYWdlL2pwZWd8YURVNUwyaGxNaTg0TnprMk1qZ3dNRGswTnpVd3wzMjk0NjZkNjNmNDMzM2VlYmE3MWQzMmFmOTVmZTcxODA1YWE2NjA2Zjk4NDNkMjYwNzZkZmNhNDlhNzdkMmYy',
            },
            {
              format: 'product',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wxNzEzOXxpbWFnZS9qcGVnfGFEZ3pMMmhoTlM4NE56azJNalV5TmpNMU1UWTJ8ZmI5M2JmMTA2MTVmNmFlOWIzOTYxOGY4NjUyYzViYTlmZmRiN2FiMGZhZjdmOWU2OGI2ZmFmMDJjMDU5MjA1OQ',
            },
          ],
          manufacturer: 'Black & Decker',
          name: 'KA86',
          price: {
            value: 63,
          },
          priceRange: {},
          stock: { isValueRounded: false, stockLevelStatus: 'inStock' },
          summary:
            '720W 75mm <em class="search-results-highlight">x</em> 457mm Belt Sander',
        },
      },
      {
        entryNumber: 6,
        quantity: 25,
        basePrice: {
          value: 65,
        },
        totalPrice: { value: 1625 },
        product: {
          code: '3318057',
          description:
            '-Performance and value.<br/>-Easy to set integral depth of cut adjustment.<br/>-Bevel cut facility for versatility max depth of cut at 45 degrees is 42mm.<br/>-Rise and fall depth setting function for optimum cutting performance.<br/>-Low noise & vibration',
          images: [
            {
              format: 'thumbnail',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wzOTQzfGltYWdlL2pwZWd8YUdVMkwyaGxaaTg0TnprMk1qZ3dORGczT1RZMnw0NTczNDQ4MjUxNjVkNDQxNDA2YzNhYmZjNzFlMWYzMjQzNzg1NGFiNDk2ZjhiODE5ZDcwMDI4NTViOGEwYmZk',
            },
            {
              format: 'product',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wyMTc2N3xpbWFnZS9qcGVnfGFERXhMMmcwTmk4NE56azJNalV6TXpJek1qazB8ZDI3MjA4YjdjNmZmMDVlM2M1NTEyNTNhZmE1MDQ2ZTU2YzExMzY0Yzc1ZjUxODFiZTY1MGFhMDU5MzM2MWQ3OA',
            },
          ],
          manufacturer: 'Black & Decker',
          name: 'CD601',
          price: {
            value: 65,
          },
          priceRange: {},
          stock: { isValueRounded: false, stockLevelStatus: 'inStock' },
          summary: '1100W 55mm Circular Saw',
        },
      },
      {
        entryNumber: 7,
        quantity: 25,
        basePrice: {
          value: 70,
        },
        totalPrice: { value: 1750 },
        product: {
          code: '3881382',
          description:
            '-ROLLTECH all rolling bearing design, reduces friction and improves performance.<br/>-Variable speed offers more control and is essential for screwdriving.<br/>-Hammer action, suitable for drilling into masonry.<br/>-Secondary handle to provide additional',
          images: [
            {
              format: 'thumbnail',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wzNjgyNHxpbWFnZS9qcGVnfGFHSXpMMmc1WXk4NE56azJNamt5TnpFd05ETXd8OTlkYTU3NjY4M2VhOTNiNmViMzZkNzI0ZjQ0ZDEyMGE2MjVmY2QxMGI4OWI1ZTQyMWE4NDhmZTJhYThiZGUxMg',
            },
            {
              format: 'product',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3w0NzE3OHxpbWFnZS9qcGVnfGFEQXdMMmc1WXk4NE56azJNalkxTlRFeU9Ua3d8ZGQwYzI5Yjk5MTRkNDNlYzVhYjNkMjdkNWRiOTEwMTliYWZjNGUxY2JkMjMxYWU2Y2IyM2YzZGY0NDI4YmE3Zg',
            },
          ],
          manufacturer: 'Black & Decker',
          name: '600w Percussion Hammer Drill - <em class="search-results-highlight">Kitted</em>',
          price: {
            value: 70,
          },
          priceRange: {},
          stock: { isValueRounded: false, stockLevelStatus: 'inStock' },
          summary:
            '600w Percussion Hammer Drill - <em class="search-results-highlight">Kitted</em>',
        },
      },
      {
        entryNumber: 8,
        quantity: 50,
        basePrice: {
          value: 26,
        },
        totalPrice: { value: 1300 },
        product: {
          code: '3884600',
          description:
            '-Lightweight sander with front and rear handles for maximum comfort and control.<br/>-VERSATILE. Large third sheet base sands flush to three sides. Ideal for using on vertical surfaces such as doors and walls, for light to medium sanding tasks.<br/>-Ergon',
          images: [
            {
              format: 'thumbnail',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3w0Mzg5NHxpbWFnZS9qcGVnfGFHSmlMMmhoTXk4NE56azJNamswTVRVeU1qSXl8YmM2YmNlYmU0NWViMmU3YjBkNjk4ODkzMzE2MjY3M2M4YzE4ZjIzYWM4ZDZhNWQ1OWEwMzEwOTM1NzZhY2U4ZQ',
            },
            {
              format: 'product',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3w1NzEzMHxpbWFnZS9qcGVnfGFERmhMMmd5TkM4NE56azJNalkyT1RVME56Z3l8MDBkN2I5MDcwYTY3NjJjY2YwZWYzN2ExZWFjYWE3ZTcxZjhiOWFjNWYwN2FjYjZjNGNjNWEzNzA0MWRmMmJjMg',
            },
          ],
          manufacturer: 'Black & Decker',
          name: 'KA300 135W <em class="search-results-highlight">1</em>/<em class="search-results-highlight">3</em> Sheet Sander',
          price: {
            value: 26,
          },
          priceRange: {},
          stock: { isValueRounded: false, stockLevelStatus: 'inStock' },
          summary:
            'KA300 135W <em class="search-results-highlight">1</em>/<em class="search-results-highlight">3</em> Sheet Sander',
        },
      },
      {
        entryNumber: 9,
        quantity: 25,
        basePrice: {
          value: 51,
        },
        totalPrice: { value: 1275 },
        product: {
          code: '3884599',
          description:
            '-Compact power - powerful 220W motor gets the job done quicker.<br/>-Compact design gets you closer to the work surface for greater control.<br/>-Large orbit size and high sander speed for faster material removal.<br/>-Versatile - Ideal for paint / varnis',
          images: [
            {
              format: 'thumbnail',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wzNTY1MXxpbWFnZS9qcGVnfGFETTNMMmhtTWk4NE56azJNamt6T1RVMU5qRTB8ZGI4N2YxNzg4MTVhOTQ1N2UwMjY4NjRhYTBmY2VlYjkzNzNjNzRlY2I2MzExMmQ4ODdlZjNkOWEyM2FmNDY2ZA',
            },
            {
              format: 'product',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3w0ODEyN3xpbWFnZS9qcGVnfGFEY3dMMmd5TkM4NE56azJNalkyT1RJeU1ERTB8NzAyNGVmNGZlYTUxMjM4MWViNjcwZmM2OGJmZDJmOGZlZDJiOTRmMTY3YzIwMTJjODJlYzc1OGNjZmI0MjdmYQ',
            },
          ],
          manufacturer: 'Black & Decker',
          name: 'KA400 220W <em class="search-results-highlight">1</em>/<em class="search-results-highlight">4</em> Sheet Sander',
          price: {
            value: 51,
          },
          priceRange: {},
          stock: { isValueRounded: false, stockLevelStatus: 'inStock' },
          summary:
            'KA400 220W <em class="search-results-highlight">1</em>/<em class="search-results-highlight">4</em> Sheet Sander',
        },
      },
      {
        entryNumber: 10,
        quantity: 25,
        basePrice: {
          value: 108,
        },
        totalPrice: { value: 2700 },
        product: {
          code: '3794509',
          description:
            '- 12V CORDLESS DRILL WITH AUTOSELECT® TECHNOLOGY - Select the application and the drill will automatically adjust to the correct setting<br/> - AUTOSELECT® - For drilling into wood, metal or masonry and screw driving applications<br/> - Variable speed for controlled drilling and screw driving<br/> - Battery level indicator lets you know how much battery charge remains at any time<br/> - Single sleeve, metal, keyless chuck makes bit changing quick and simple<br/> - Easy, quick change of batteries due to new slide pack battery locking system<br/> - Anti-slip soft grip for more comfort<br/> - Forward/reverse switch for added versatility<br/> - 1.5Ahr batteries for a longer run time per charge<br/> - Hammer action for drilling into masonry and concrete',
          images: [
            {
              format: 'thumbnail',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3w0Mjk0OXxpbWFnZS9qcGVnfGFEZzVMMmc0T1M4NE56azJNamcwTURreU5EUTJ8NzA4NDE3OGMxNmVmZmMxMDZlMDRiN2NiMjBiYzg3ZmJlZWRmYzA5NGRkNmViZDZiMzdlMWM1YzM5MDg4ZGU4Ng',
            },
            {
              format: 'product',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3w1NTAzNHxpbWFnZS9qcGVnfGFEQTBMMmhoTlM4NE56azJNalUzTVRnNU9URTR8NmUxMmVmZjYwYTg4YzIzY2YzMjcyYjcwNDk0ODJjYzM4NDlhNjBmZDExMDhiMjBlOTFiYWU5Y2VhNGQ3NTQ1NQ',
            },
          ],
          manufacturer: 'Black & Decker',
          name: '<em class="search-results-highlight">12</em> Volt AutoSelect cordless drill',
          price: {
            value: 108,
          },
          priceRange: {},
          stock: { isValueRounded: false, stockLevelStatus: 'inStock' },
          summary: '12V AUTOSELECT cordless drill',
        },
      },
      {
        entryNumber: 11,
        quantity: 25,
        basePrice: {
          value: 135,
        },
        totalPrice: { value: 3375 },
        product: {
          code: '3794514',
          description:
            '- 18V CORDLESS DRILL WITH AUTOSELECT® TECHNOLOGY - Select the application and the drill will automatically adjust to the correct setting<br/> - AUTOSELECT® - For drilling into wood, metal or masonry and screw driving applications<br/> - Variable speed for controlled drilling and screw driving<br/> - Battery level indicator lets you know how much battery charge remains at any time<br/> - Single sleeve, metal, keyless chuck makes bit changing quick and simple<br/> - Easy, quick change of batteries due to new slide pack battery locking system<br/> - Anti-slip soft grip for more comfort<br/> - Forward/reverse switch for added versatility<br/> - 1.5Ahr battery for a longer run time per charge<br/> - Hammer action for drilling into masonry and concrete<br/> - Powerful 18v, faster motor for more efficient drilling',
          images: [
            {
              format: 'thumbnail',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3wyNzAyMXxpbWFnZS9qcGVnfGFEUTJMMmc1TUM4NE56azJNamcwTWpnNU1EVTB8NjBkMWQzYzU2OWRkNWVhZTU4MzA0NDMzMmRhYjcwNjIzNGExZjVhMTAxMjhhNWJhZWFlNGZkNzUzMTA4YjE5OQ',
            },
            {
              format: 'product',
              imageType: 'PRIMARY',
              url: '/medias/?context=bWFzdGVyfGltYWdlc3w0MDg5MnxpbWFnZS9qcGVnfGFETTBMMmc1WlM4NE56azJNalUzTXpnMk5USTJ8NmFhNzBiZjZkZDczM2VhNDZhZGYzNzZjMjY2ZTg3NzU1MGU1MjdkNGE2ZDM0YjUyODM0ZjFkNjRjMTE1MDVjNQ',
            },
          ],
          manufacturer: 'Black & Decker',
          name: '18V Auto Select cordless drill',
          price: {
            value: 135,
          },
          priceRange: {},
          stock: { isValueRounded: false, stockLevelStatus: 'inStock' },
          summary: '18V AUTOSELECT cordless drill',
        },
      },
    ],
    totalItems: 11,
    totalUnitCount: 325,
    subTotal: { value: 22475 },
    totalDiscounts: { value: 0 },
    totalTax: { value: 3371.25 },
    totalPriceWithTax: { value: 25846.25 },
    deliveryAddress: {
      id: '0001234',
      street1: '2709 Woodburn Ave',
      city: 'Cincinatti',
      stateOrProvince: 'OH',
      countryCode: 'US',
      postalcode: '45202',
      defaultAddress: true,
      shippingAddress: true,
      visible: true,
    },
    deliveryMode: {
      code: 'fedex-standard',
      name: 'FedEx Standard',
      deliveryCost: { value: 0.125 },
    },
    totalPrice: { value: 28655.625 },
    purchaseOrderNumber: 'po26671',
    creationTime: '2024-09-16T19:08:57.435Z',
    expirationTime: '2024-10-16T19:08:57.435Z',
    updateTime: '2024-10-07T19:09:52.986Z',
  },
];
