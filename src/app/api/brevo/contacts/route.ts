import { NextRequest, NextResponse } from 'next/server';

interface BrevoPayload {
  updateEnabled: boolean;
  email?: string;
  attributes: {
    FIRSTNAME?: string;
    LASTNAME?: string;
    SMS?: string;
    [key: string]: string | undefined;
  };
}

export async function POST(request: NextRequest) {
  try {
    // Parse del body della richiesta
    const body = await request.json();
    const { email, phone, firstName, lastName, attributes = {} } = body;

    // Validazione base
    if (!email && !phone) {
      return NextResponse.json(
        { error: 'Email o numero di telefono richiesto' },
        { status: 400 }
      );
    }

    // Preparazione del payload per l'API Brevo
    const brevoPayload: BrevoPayload = {
      updateEnabled: false,
      attributes: {
        ...attributes
      }
    };

    // Aggiunta email se fornita
    if (email) {
      brevoPayload.email = email;
    }

    // Aggiunta nome e cognome se forniti
    if (firstName) {
      brevoPayload.attributes.FIRSTNAME = firstName;
    }
    if (lastName) {
      brevoPayload.attributes.LASTNAME = lastName;
    }

    // Aggiunta telefono nel formato richiesto da Brevo
    if (phone) {
      // Il telefono deve essere nel formato {"SMS": "+391234567890"}
      brevoPayload.attributes.SMS = phone.startsWith('+') ? phone : `+39${phone}`;
    }

    // Chiamata all'API Brevo
    const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': process.env.BREVO_API_KEY || ''
      },
      body: JSON.stringify(brevoPayload)
    });

    const responseData = await brevoResponse.json();

    if (!brevoResponse.ok) {
      console.error('Errore API Brevo:', responseData);
      return NextResponse.json(
        { 
          error: 'Errore nella creazione del contatto',
          details: responseData
        },
        { status: brevoResponse.status }
      );
    }

    // Successo
    return NextResponse.json({
      success: true,
      contact: responseData,
      message: 'Contatto creato con successo'
    });

  } catch (error) {
    console.error('Errore interno:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
}

// Opzionale: metodo GET per testare che l'endpoint funzioni
export async function GET() {
  return NextResponse.json({
    message: 'API Brevo Contacts endpoint attivo',
    methods: ['POST'],
    usage: {
      POST: {
        description: 'Crea un nuovo contatto in Brevo',
        body: {
          email: 'string (opzionale se presente phone)',
          phone: 'string (opzionale se presente email)',
          firstName: 'string (opzionale)',
          lastName: 'string (opzionale)',
          attributes: 'object (opzionale - attributi personalizzati)'
        }
      }
    }
  });
} 