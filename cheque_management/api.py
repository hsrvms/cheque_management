import json

import frappe


@frappe.whitelist()
def create_cheques_via_pe(doc):
    """
    TODO:
        - Create Payment Entry for each Cheque in the table using the related
        form data. Clean the form and route to the PE list.
        - A modal should appear to ask users if the Created PE's should be
        submitted or just in draft mode to review it.
        - Create Receivable Cheque for each Cheque in the table
    """
    doc = json.loads(doc) if isinstance(doc, str) else doc
    doc = frappe._dict(doc)
    docname = doc.get("name")
    print("\n\n\n")
    print("Before dict")
    print(type(doc))
    print(f"dict: {doc}")
    print("After dict")
    print("\n\n\n")
    print(f"docname: {docname}")
    print(f"docname: {doc.name}")
    print("\n\n\n")
    for key in doc:
        print(f"{key}: {doc[key]}")
    print("\n\n\n")

    return "Something"
