import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-2.1";
class GetNote{
    static async initialize(){
        let user= new ZOHOCRMSDK.UserSignature('myname@mydomain.com');
        let environment = ZOHOCRMSDK.USDataCenter.PRODUCTION();
        let token =(new ZOHOCRMSDK.OAuthBuilder())
            .clientId("1000.xxxx")
            .clientSecret("xxxxxx")
            .refreshToken("1000.xxxxx.xxxxx")
            .build();
        (await new ZOHOCRMSDK.InitializeBuilder())
            .user(user)
            .environment(environment)
            .token(token)
            .initialize();
    }
    /**
     * <h3> Get Note </h3>
     * This method is used to get the note and print the response.
     * @param {BigInt} noteId The ID of the Note to be obtained
     */
    static async getNote(noteId) {
        //example
        //let noteId = 549003n
        let notesOperations = new ZOHOCRMSDK.Notes.NotesOperations();
        let paramInstance = new ZOHOCRMSDK.ParameterMap();
        /* Possible parameters for Get Note */
        // await paramInstance.add(ZOHOCRMSDK.Notes.GetNoteParam.FIELDS, "id, Note_Content")
        let headerInstance = new ZOHOCRMSDK.HeaderMap();
        /* Possible headers for Get Note */
        // await headerInstance.add(ZOHOCRMSDK.Notes.GetNoteHeader.IF_MODIFIED_SINCE, new Date());
        //Call getNote method that takes noteId as parameter
        let response = await notesOperations.getNote(noteId, paramInstance, headerInstance);
        if (response != null) {
            console.log("Status Code: " + response.getStatusCode());
            if ([204, 304].includes(response.getStatusCode())) {
                console.log(response.getStatusCode() == 204 ? "No Content" : "Not Modified");
                return;
            }
            let responseObject = response.getObject();
            if (responseObject != null) {
                if (responseObject instanceof ZOHOCRMSDK.Notes.ResponseWrapper) {
                    let notes = responseObject.getData();
                    notes.forEach(note => {
                        let owner = note.getOwner();
                        if (owner != null) {
                            console.log("Note Owner User-Name: " + owner.getName());
                            console.log("Note Owner User-ID: " + owner.getId());
                            console.log("Note Owner Email: " + owner.getEmail());
                        }
                        console.log("Note ModifiedTime: " + note.getModifiedTime());
                        let attachments = note.getAttachments();
                        if (attachments != null) {
                            attachments.forEach(attachment => {
                                this.printAttachment(attachment);
                            });
                        }
                        console.log("Note CreatedTime: " + note.getCreatedTime());
                        let parentId = note.getParentId();
                        if (parentId != null) {
                            if (parentId.getKeyValue("name") != null) {
                                console.log("Note parent record Name: " + parentId.getKeyValue("name"));
                            }
                            console.log("Note parent record ID: " + parentId.getId());
                        }
                        console.log("Note Editable: " + note.getEditable().toString());
                        console.log("Note SeModule: " + note.getSeModule());
                        console.log("Note IsSharedToClient: " + note.getIsSharedToClient().toString());
                        let modifiedBy = note.getModifiedBy();
                        if (modifiedBy != null) {
                            console.log("Note Modified By User-Name: " + modifiedBy.getName());
                            console.log("Note Modified By User-ID: " + modifiedBy.getId());
                            console.log("Note Modified By User-Email: " + modifiedBy.getEmail());
                        }
                        console.log("Note Size: " + note.getSize());
                        console.log("Note State: " + note.getState());
                        console.log("Note VoiceNote: " + note.getVoiceNote().toString());
                        console.log("Note Id: " + note.getId());
                        let createdBy = note.getCreatedBy();
                        if (createdBy != null) {
                            console.log("Note Created By User-Name: " + createdBy.getName());
                            console.log("Note Created By User-ID: " + createdBy.getId());
                            console.log("Note Created By User-Email: " + createdBy.getEmail());
                        }
                        console.log("Note NoteTitle: " + note.getNoteTitle());
                        console.log("Note NoteContent: " + note.getNoteContent());
                        console.log("Note SharingPermission: " + note.getSharingPermission());
                    });
                }
            }
            else if (responseObject instanceof ZOHOCRMSDK.Notes.APIException) {
                console.log("Status: " + responseObject.getStatus().getValue());
                console.log("Code: " + responseObject.getCode().getValue());
                console.log("Details");
                let details = responseObject.getDetails();
                if (details != null) {
                    Array.from(details.keys()).forEach(key => {
                        console.log(key + ": " + details.get(key));
                    });
                }
                console.log("Message: " + responseObject.getMessage().getValue());
            }
        }
    }
    static async printAttachment(attachment) {
        let owner = attachment.getOwner();
        if (owner != null) {
            console.log("Note Attachment Owner User-Name: " + owner.getName());
            console.log("Note Attachment Owner User-ID: " + owner.getId());
            console.log("Note Attachment Owner User-Email: " + owner.getEmail());
        }
        console.log("Note Attachment Modified Time: " + attachment.getModifiedTime().toString());
        console.log("Note Attachment File Name: " + attachment.getFileName());
        console.log("Note Attachment Created Time: " + attachment.getCreatedTime().toString());
        console.log("Note Attachment File Size: " + attachment.getSize().toString());
        let parentId = attachment.getParentId();
        if (parentId != null) {
            console.log("Note Attachment parent record Name: " + parentId.getKeyValue("name"));
            console.log("Note Attachment parent record ID: " + parentId.getId());
        }
        console.log("Note Attachment is Editable: " + attachment.getEditable().toString());
        console.log("Note Attachment SharingPermission: " + attachment.getSharingPermission());
        console.log("Note Attachment File ID: " + attachment.getFileId());
        console.log("Note Attachment File Type: " + attachment.getType());
        console.log("Note Attachment seModule: " + attachment.getSeModule());
        let modifiedBy = attachment.getModifiedBy();
        if (modifiedBy != null) {
            console.log("Note Attachment Modified By User-Name: " + modifiedBy.getName());
            console.log("Note Attachment Modified By User-ID: " + modifiedBy.getId());
            console.log("Note Attachment Modified By User-Email: " + modifiedBy.getEmail());
        }
        console.log("Note Attachment Type: " + attachment.getAttachmentType());
        console.log("Note Attachment State: " + attachment.getState());
        console.log("Note Attachment ID: " + attachment.getId());
        let createdBy = attachment.getCreatedBy();
        if (createdBy != null) {
            console.log("Note Attachment Created By User-Name: " + createdBy.getName());
            console.log("Note Attachment Created By User-ID: " + createdBy.getId());
            console.log("Note Attachment Created By User-Email: " + createdBy.getEmail());
        }
        console.log("Note Attachment LinkUrl: " + attachment.getLinkUrl());
    }
}
await GetNote.initialize();
let noteId = 440248000000966003n
await GetNote.getNote(noteId);
export {
    GetNote as GetNote
}
