import { deleteContact, getContacts } from "@/app/actions/contact";
import Contacts from "@/components/Contact";


export default async function ContactPages() {
  const contacts = await getContacts();
  return (
    <>
      <Contacts 
        initialContacts={contacts}
        onDeleteContact={deleteContact}
      />
    </>
  )
}