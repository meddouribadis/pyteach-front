import React from "react";

function DeleteModal(props) {

    function handleDelete() {
        props.modalFunction();
    }

    return (
        <div className="modal fade" id={props.idModal} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Supprimer l'élément #{props.selectedArticle}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        Vous vous appretez à supprimer l'élément ayant pour id #{props.selectedArticle}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Annuler</button>
                        <button type="button" className="btn btn-danger" onClick={handleDelete} data-dismiss="modal">Supprimer</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { DeleteModal };
