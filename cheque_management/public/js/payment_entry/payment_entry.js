frappe.require([], () => {
  frappe.ui.form.on("Payment Entry", {
    refresh(frm) {
      console.log("--Refresh--");
    },

    onload(frm) {
      console.log("--Onload--");
    },

    mode_of_payment(frm) {
      console.log("--Mode Of Payment--");
      frm.trigger("adjust_form_for_cheques");
    },

    payment_type(frm) {
      console.log("--Payment Type--");
      frm.trigger("adjust_form_for_cheques");
    },

    adjust_form_for_cheques(frm) {
      console.log("-- Adjust Form For Cheques --");
      if (
        frm.doc.payment_type === "Internal Transfer" &&
        frm.doc.mode_of_payment === "Cheque"
      ) {
        frm.doc.payment_type = "Receive";
        frappe.throw(
          "Mode Of Payment Cannot Be 'Cheque' For Internal Transfer",
        );
      }

      let showCheques = frm.doc.mode_of_payment === "Cheque";
      hideUnhideCheques(frm, showCheques);
    },
  });
});

function hideUnhideCheques(frm, showCheques) {
  let chequeTableName;
  if (frm.doc.payment_type === "Receive") {
    chequeTableName = "custom_customer_cheques";
  }

  if (showCheques) {
    frm.disable_save();
    frm.add_custom_button(__("Create Cheques"), () =>
      onClickCreateChequeBtn(frm, chequeTableName),
    );
    $('.custom-actions .btn[data-label="Create%20Cheques"]').addClass(
      "btn-primary",
    );
  } else {
    frm.enable_save();
    frm.clear_custom_buttons();
  }

  frm.set_df_property(chequeTableName, "hidden", !showCheques);
}

function onClickCreateChequeBtn(frm, chequeTableName) {
  console.log("-- Create Cheques --");
  let cheques = frm.doc[chequeTableName];
  frappe.call({
    method: "cheque_management.api.create_cheques_via_pe",
    args: {
      doc: frm.doc,
    },
    callback: function (r) {
      if (r.message) {
        frappe.msgprint(r.message);
      }
    },
  });
  console.log("Cheques Table:", cheques);
}
