
import PolicyPage from '@/components/policy-page';

export default function Privacy() {
  return (
    <PolicyPage
      title="Privacy Policy"
      intro={`This policy explains how Betty Box Maker ("Betty", "we", "us") collects, uses and protects information when you use our website, account and 3D box design tools.`}
      sections={[
        {
          heading: 'Information we collect',
          body: 'We may collect account details such as your name and email address, authentication data, project names and face text you choose to save, subscription identifiers and download usage, plus basic technical and diagnostic information needed to operate and secure the service.',
        },
        {
          heading: 'How we use information',
          body: 'We use information to provide the editor, maintain your account, process subscriptions through Paddle, enforce plan allowances, respond to support requests, protect against abuse and improve reliability. We do not sell personal information.',
        },
        {
          heading: 'Payments',
          body: 'Payments are handled by Paddle as our payment provider and merchant-of-record partner where applicable. Payment details are handled under Paddle’s own privacy terms; Betty does not need to store your full card number.',
        },
      ]}
    />
  );
}
