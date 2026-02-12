import { Contact } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export async function getAllContacts({
  page,
  perPage,
  sortBy,
  sortOrder,
  filter,
}) {
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const contactQuery = Contact.find();
    console.log(filter.isFavourite);
    
  if(typeof filter.isFavourite !== "undefined"){
      contactQuery.where("isFavourite").equals(filter.isFavourite);
  };

  const [contactCount, contacts] = await Promise.all([
    Contact.find().merge(contactQuery).countDocuments(),
    contactQuery
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(perPage)
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
}

export async function getContactsById(contactsId) {
  return Contact.findById(contactsId);
}

export async function createContact(payload) {
  return Contact.create(payload);
}

export async function deleteContact(contactId) {
  return Contact.findByIdAndDelete(contactId);
}

export async function replaceContact(contactId, payload) {
  const result = await Contact.findByIdAndUpdate(contactId, payload, {
    new: true,
    upsert: true,
    includeResultMetadata: true,
  });

  return {
    value: result.value,
    updatedExisting: result.lastErrorObject.updatedExisting,
  };
}

export async function updateContact(contactId, payload) {
  return Contact.findByIdAndUpdate(contactId, payload, { new: true });
}
