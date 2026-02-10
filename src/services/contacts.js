import { Contact } from "../db/models/contact.js";

export async function getAllContacts(){
    return Contact.find();
}

export async function getContactsById(contactsId) {
    return Contact.findById(contactsId);
}

export async function createContact(payload){
    return Contact.create(payload);
}

export async function deleteContact(contactId){
    return Contact.findByIdAndDelete(contactId);
}

export async function replaceContact(contactId, payload) {
    const result = await Contact.findByIdAndUpdate(contactId,payload, {
        new: true,
        upsert: true,
        includeResultMetadata: true
    });

    return {
        value: result.value,
        updatedExisting: result.lastErrorObject.updatedExisting,
    };
} 

export async function updateContact(contactId, payload){
    return Contact.findByIdAndUpdate(contactId, payload, {new: true});
}