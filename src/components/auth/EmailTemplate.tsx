import * as React from 'react';

interface EmailTemplateProps {
  confirmLink: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  confirmLink
}) => (
  <div className="font-sans text-gray-800">
    <h1 className="text-2xl font-bold text-blue-600">¡Bienvenido a Valles Tour!</h1>
    <p className="mt-4">
      Estamos emocionados de que te unas a nuestra comunidad. Para completar tu registro y confirmar tu dirección de correo, por favor haz clic en el siguiente enlace:
    </p>
    <p className="mt-6">
      <a
        href={confirmLink}
        className="inline-block px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
      >
        Confirmar mi email
      </a>
    </p>
    <p className="mt-6">
      Si no solicitaste este correo, puedes ignorarlo. Si tienes alguna duda, no dudes en contactarnos.
    </p>
    <p className="mt-8">¡Gracias por elegir Valles Tour!</p>
    <p>El equipo de Valles Tour</p>
  </div>
);
