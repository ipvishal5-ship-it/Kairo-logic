import Brand from "@/components/brand";
export const metadata = { title: "Enquiry privacy notice | Kairologic" };
export default function Privacy() {
  return (
    <main className="utility-page privacy-page container">
      <a href="/">
        <Brand />
      </a>
      <p className="eyebrow">YOUR INFORMATION</p>
      <h1>Enquiry privacy notice</h1>
      <p>
        When you submit an enquiry, we collect your name, email address,
        organisation (if supplied), message and permission to contact you.
      </p>
      <h2>How we use it</h2>
      <p>
        We use these details to review your request and respond about the
        workflow, implementation or demonstration you asked about. Submitting
        the form does not subscribe you to a marketing list.
      </p>
      <h2>Where it goes</h2>
      <p>
        Enquiries are stored in the website’s database. The enquiry inbox is
        restricted to the authorised site owner. We do not display your enquiry
        publicly.
      </p>
      <h2>Abuse prevention</h2>
      <p>
        We store submission times and a hashed network identifier to help limit
        automated or repeated submissions. The form does not ask for a phone
        number.
      </p>
      <h2>Keep the first message brief</h2>
      <p>
        Please do not include borrower records, confidential case files,
        identity documents or passwords in this form. We can discuss an
        appropriate way to exchange case information separately.
      </p>
      <h2>Questions or deletion requests</h2>
      <p>
        Submit an enquiry using the same email address and tell us what you
        would like to correct or delete.
      </p>
      <a className="button primary" href="/#contact">
        Return to the enquiry form
      </a>
    </main>
  );
}
