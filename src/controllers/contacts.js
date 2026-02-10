import {
  getAllContacts,
  getContactsById,
  createContact,
  deleteContact,
  replaceContact,
  updateContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';

export const getContactsController = async (req, res, next) => {
  const data = await getAllContacts();
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: data,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactsById(contactId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  console.log('Contact: ', contact);
  res.status(200).json({
    status: 200,
    message: 'Contnact get successfully',
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const contact = await createContact(req.body);


  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;

  const result = deleteContact(contactId);

  console.log(result);

  if(!result){
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: "Contact deleted.",
  });
};


export const upsertContactController = async (req, res) => {
  const result = await replaceContact(req.params.contactId, req.body);

  if(result.updatedExisting === true){
    return res.json({
    status: 200,
    message: "Contact updated successfully.",
    data: result.value
  });
  }
  
  res.status(201).json({
    status: 201,
    message: "Contact created successfully.",
    data: result.value
  });
};

export const updateContactController = async (req, res) => {
  const contact = await updateContact( req.params.contactId, req.body);

  if(!contact){
    return new createHttpError.NotFound("Student not found");  
  }

    res.status(200).json({
    status:200, 
    message: "Contact update successfully.",
    data: contact
  });
  
};
