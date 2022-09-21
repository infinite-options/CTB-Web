import { findByLabelText } from "@testing-library/react";
import {useState, useRef, useEffect} from "react";
import { Row, Col, Container, Form, Button, Table, Modal } from "react-bootstrap";
import HomepageNavbar from "../components/HomepageNavbar";
import axios from "axios";
import "../Styles/tech.css"
import "../Styles/ClearToBuild.css"

const baseURL =
  "https://tn5e0l3yok.execute-api.us-west-1.amazonaws.com/dev/api/v2/AllProducts";
const inventoryURL =
  "https://tn5e0l3yok.execute-api.us-west-1.amazonaws.com/dev/api/v2/Inventory";

class RowData {
    constructor(
        part_uid,
        part,
        qty_per,
        need_qty,
        sub_qty,
        delta_qty,
        allocatable_qty,
        allocated_qty,
        delta2_qty,
        inventory,
        available_inv,
        allocate_input,
        final_order_qty,
        unit_price,
        total_price,
        original_allocate
    ) {
        this.part_uid = part_uid;
        this.part = part;
        this.qty_per = qty_per;
        this.need_qty = need_qty;
        this.sub_qty = sub_qty;
        this.delta_qty = delta_qty;
        this.allocatable_qty = allocatable_qty;
        this.allocated_qty = allocated_qty;
        this.delta2_qty = delta2_qty;
        this.inventory = inventory;
        this.available_inv = available_inv;
        this.allocate_input = allocate_input;
        this.final_order_qty = final_order_qty;
        this.unit_price = unit_price;
        this.total_price = total_price;
        this.original_allocate = original_allocate;
    }
}


const ClearToBuild = () => {
    const trackTable = useRef()

    const [showTable, setShowTable] = useState(false)

    const [Rows, setRows] = useState([]);
    const [Top_Level, setTop_Level] = useState();
    const [Desired_Qty, setDesired_Qty] = useState();
    const [Desired_Date, setDesired_Date] = useState();
    const [selectedFile, setSelectedFile] = useState();
    const [productId, setProductId] = useState();
    const [bom, setBom] = useState([]);
    const [allocate, setAllocate] = useState([]);
    const [Info, setInfo] = useState([]);
    const [index, setIndex] = useState();
    const [parent, setParent] = useState([]);
    const [inventory, setInventory] = useState();
    const [country, setCountry] = useState("US");
    const [options, setOptions] = useState([]);
    const [selectedPartID, setSelectedPartID] = useState([]);
    const [selectedPrevInvUID, setSelectedPrevInvUID] = useState("");
    const [allocationQty, setAllocationQty] = useState(0);
    const [allocationObject, setAllocationObject] = useState([]);
    const [allocatedObj, setAllocatedObj] = useState({});
    const [allocated, setAllocated] = useState({});
    const [finalAllocated, setFinalAllocated] = useState({});
    const [rawInvAlloc, setRawInvAlloc] = useState({});
    const [show, setShow] = useState(false);
    const [orderSummary, setOrderSummary] = useState([])

    const handleClose = () => {
        setShow(false);
        setAllocationQty(0);
        setAllocated({});
        setFinalAllocated({});
        setSelectedPrevInvUID("");
    };
    const handleShow = () => setShow(true);

    // save changes function for allocation
    const handleSave = () => {
        let payload = [];
        let tempPayload = [];
        console.log(options);
        tempPayload = options.map((option) => {
        return option.child_pn === selectedPartID.split("-")[0] &&
            option["allocate"] !== 0 &&
            option["original_allocate"] < option["allocate"]
            ? {
                product_uid: productId,
                inv_uid: option["inv_uid"],
                assembly: option["parent_pn"],
                assy_lft: option["gp_lft"],
                allocated:
                parseInt(option["allocate"]) -
                parseInt(option["original_allocate"]),
            }
            : option.child_pn === selectedPartID.split("-")[0] &&
            option["allocate"] !== 0 &&
            option["original_allocate"] > option["allocate"]
            ? {
                product_uid: productId,
                inv_uid: option["inv_uid"],
                assembly: option["parent_pn"],
                assy_lft: option["gp_lft"],
                allocated:
                parseInt(option["allocate"]) -
                parseInt(option["original_allocate"]),
            }
            : "";
        });
        console.log(tempPayload);

        for (let i = 0; i < tempPayload.length; i++) {
        if (tempPayload[i] !== "") {
            payload.push(tempPayload[i]);
        }
        }
        console.log(payload);
        const postURL =
        "https://tn5e0l3yok.execute-api.us-west-1.amazonaws.com/dev/api/v2/Allocation";
        axios.post(postURL, payload).then((res) => {
        console.log(res);
        });

        setShow(false);
        setAllocationQty(0);
        setAllocated({});
        setFinalAllocated({});
        setSelectedPrevInvUID("");
        updateTable();
    };

    const handleSave2 = () => {
        let payload = [];
        let tempPayload = [];
        console.log(Rows);
        tempPayload = Rows.map((row) => {
        return parseInt(row["allocate_input"]) !== 0 &&
            row["original_allocate"] < row["allocate_input"]
            ? {
                product_uid: productId,
                inv_uid: row["part_uid"],
                assembly: row["part"].split("-")[0],
                assy_lft: row["part"].split("-")[1],
                allocated:
                parseInt(row["allocate_input"]) -
                parseInt(row["original_allocate"]),
            }
            : parseInt(row["allocate_input"]) !== 0 &&
            row["original_allocate"] > row["allocate_input"]
            ? {
                product_uid: productId,
                inv_uid: row["part_uid"],
                assembly: row["part"].split("-")[0],
                assy_lft: row["part"].split("-")[1],
                allocated:
                parseInt(row["allocate_input"]) -
                parseInt(row["original_allocate"]),
            }
            : "";
        });
        console.log(tempPayload);

        for (let i = 0; i < tempPayload.length; i++) {
        if (tempPayload[i] !== "") {
            payload.push(tempPayload[i]);
        }
        }
        console.log(payload);
        const postURL =
        "https://tn5e0l3yok.execute-api.us-west-1.amazonaws.com/dev/api/v2/Allocation";
        axios.post(postURL, payload).then((res) => {
        console.log(res);
        });

        setShow(false);
        setAllocationQty(0);
        setAllocated({});
        setFinalAllocated({});
        setSelectedPrevInvUID("");
        updateTable();
    };

    // split string function
    function splitString(string) {
        let wordArray = [];
        let incompleteWord = "";
        let quotePos = 0;
        //console.log(string);
        for (let i = 0; i < string.length; i++) {
        if (string.charAt(i) === '"') {
            if (quotePos === 0) quotePos = 1;
            else {
            wordArray.push(incompleteWord.trim());
            incompleteWord = "";
            quotePos = 0;
            continue;
            }
        } else {
            if (quotePos === 1) incompleteWord += string.charAt(i);
        }
        }
        return wordArray;
    }
    const getAllocate = (part) => {
        let option = [];
        let obj = {};
        let obj2 = {};
        let key = "";
        let key2 = "";
        let k2 = "";
        let finalObj = {};
        for (let i in allocate) {
        if (
            allocate[i]["gp_lft"] < parseInt(part.split("-")[1]) &&
            parseInt(part.split("-")[1]) < allocate[i]["gp_rgt"] &&
            allocate[i]["inv_available_date"] < Desired_Date
        ) {
            for (let j in Rows) {
            if (
                Rows[j]["part"] ===
                allocate[i]["child_pn"] + "-" + allocate[i]["child_lft"]
            ) {
                allocate[i]["order"] =
                allocationObject.length > 0
                    ? allocationObject.map((al) =>
                        al.child_pn + "-" + al.child_lft === Rows[j]["part"]
                        ? Rows[j]["delta2_qty"]
                        : Rows[j]["delta2_qty"]
                    )[0]
                    : Rows[j]["delta2_qty"];
                allocate[i]["original_order"] =
                allocationObject.length > 0
                    ? allocationObject.map((al) =>
                        al.child_pn + "-" + al.child_lft === Rows[j]["part"]
                        ? Rows[j]["delta_qty"]
                        : Rows[j]["delta_qty"]
                    )[0]
                    : Rows[j]["delta_qty"];
                allocate[i]["allocate"] = 0;
                allocate[i]["original_allocate"] = 0;
                allocate[i]["previously_allocated"] = 0;
                allocate[i]["allocatable"] = 0;
                allocate[i]["allocated"] =
                allocate[i]["allocate"] * allocate[i]["RequiredQty"];
                if (allocationObject.length !== 0) {
                for (let k in allocationObject) {
                    if (
                    allocationObject[k]["Allocation_inventory_uid"] ===
                        allocate[i]["inv_uid"] &&
                    allocate[i]["child_pn"] === allocationObject[k]["child_pn"] &&
                    allocate[i]["child_lft"] === allocationObject[k]["child_lft"]
                    ) {
                    allocate[i]["original_allocate"] +=
                        allocationObject[k]["sum(Allocation_allocated_qty)"];
                    allocate[i]["allocate"] +=
                        allocationObject[k]["sum(Allocation_allocated_qty)"];

                    allocate[i]["allocated"] +=
                        allocationObject[k]["sum(Allocation_allocated_qty)"] *
                        allocate[i]["RequiredQty"];
                    }
                    if (
                    allocationObject[k]["Allocation_inventory_uid"] ===
                        allocate[i]["inv_uid"] &&
                    allocate[i]["child_pn"] === allocationObject[k]["child_pn"] &&
                    allocate[i]["child_lft"] !== allocationObject[k]["child_lft"]
                    ) {
                    allocate[i]["previously_allocated"] +=
                        allocationObject[k]["sum(Allocation_allocated_qty)"];
                    }
                    if (
                    allocationObject[k]["Allocation_inventory_uid"] ===
                        allocate[i]["inv_uid"] &&
                    allocate[i]["child_pn"] === allocationObject[k]["child_pn"]
                    ) {
                    allocate[i]["allocatable"] =
                        allocate[i]["inv_qty"] -
                        allocate[i]["previously_allocated"] -
                        allocate[i]["allocate"];
                    } else {
                    allocate[i]["allocatable"] =
                        allocate[i]["inv_qty"] -
                        allocate[i]["previously_allocated"] -
                        allocate[i]["allocate"];
                    }
                }
                } else {
                allocate[i]["original_allocate"] = 0;
                allocate[i]["allocate"] = 0;
                allocate[i]["allocated"] = 0;
                allocate[i]["previously_allocated"] = 0;
                // allocate[i]["allocatable"] = allocate[i]["inv_qty"];
                }
            }
            key = allocate[i]["child_pn"];

            // obj = { `{key}`: allocate[i]["order"] };
            obj[key] = allocate[i]["original_order"];
            // finalObj[key] = allocate[i]["allocate"];
            // finalObj[key] = 0;
            }

            option.push(allocate[i]);
        }
        }
        option.sort((a, b) =>
        a.inv_uid > b.inv_uid ? 1 : b.inv_uid > a.inv_uid ? -1 : 0
        );
        for (let i = 0; i < option.length; i++) {
        key2 = option[i]["child_pn"] + "-" + option[i]["child_lft"] + "-" + i;
        obj2[key2] = option[i]["allocate"] * option[i]["RequiredQty"];

        k2 = option[i]["child_pn"];
        //  finalObj[k2] = 0;
        finalObj[k2] = 0;
        }
        let y = Object.keys(obj2);
        let k = "";
        for (let z = 0; z < y.length; z++) {
        k = y[z].split("-")[0];
        if (Object.keys(finalObj).includes(k)) {
            finalObj[k] = finalObj[k] + obj2[y[z]];
        }
        }
        console.log(option);
        console.log("obj", obj, obj2, finalObj);
        setAllocatedObj(obj);
        setAllocated(obj2);
        setFinalAllocated(finalObj);
        setOptions(option);
        handleShow();
        setAllocationQty(0);
        setSelectedPrevInvUID("");
    };

    const changeBox2 = (event) => {
        console.log(document.getElementById("box1").value);
        setProductId(event.target.value);
        document.getElementById("box2").selectedIndex =
        document.getElementById("box1").selectedIndex;
        console.log(document.getElementById("box1").selectedIndex);
        var temp = document.getElementById("box1").selectedIndex;
        setIndex(temp);

        let parents = Info.map((a) => a.product_parents);
        setParent(parents[document.getElementById("box1").selectedIndex]);
        // setTop_Level("A");
        setTop_Level(splitString(parents[document.getElementById("box1").selectedIndex])[0])
        // console.log("Parent 2", splitString(parent)[0])
        // console.log("Parent 2.1", splitString(parents[0])[0])


        // setIndex(document.getElementById('box1').selectedIndex);

        // useEffect(() => console.log("re-render because x changed:", index), []);
        // setIndex(temp);
        // console.log(temp);

        // setIndex(document.getElementById('box1').selectedIndex);
        // var temp = document.getElementById('box1').selectedIndex;
        // this.setIndex({value: temp}, function () {
        //     console.log(this);
        // });

        // useIndex(() => console.log(index));
        // console.log(this.index);
    };

    const changeBox1 = (event) => {
        console.log(event.target.value);
        document.getElementById("box1").selectedIndex =
        document.getElementById("box2").selectedIndex;
        setIndex(document.getElementById("box2").selectedIndex);
        console.log(index);
        setProductId(document.getElementById("box1").value);
        let parents = Info.map((a) => a.product_parents);
        setParent(parents[document.getElementById("box1").selectedIndex]);
        let string3 =
        '"this is a question"random omitted "answer one" text between quotes "answer two" zzz "answer three"';
        // setTop_Level("A");
        setTop_Level(splitString(parents[document.getElementById("box1").selectedIndex])[0])
        // console.log("Parent 3", splitString(parent)[0])
        // console.log("Parent 3.1", splitString(parents[0])[0])
    };

    useEffect(() => {
        axios.get(baseURL).then((response) => {
        setInfo(response.data);

        let parents = response.data.map((a) => a.product_parents);
        //   console.log(parents);
        setParent(parents[0]);
        setTop_Level("A");
        // setTop_Level(splitString(parent)[0])
        });
        axios.get(inventoryURL).then((response) => {
        setInventory(response.data);
        });
    }, []);

    let changeTop_Level = (e) => {
        setTop_Level(e.target.value);
        console.log(e.target.value);
    };
    let changeCountry = (e) => {
        setCountry(e.target.value);
        console.log(e.target.value);
    };

    let changeDesired_Qty = (e) => {
        setDesired_Qty(e.target.value);
        console.log(e.target.value);
    };

    let changeAllocationQty = (id, invID, e) => {
        let al = 0;
        let key = "";
        let obj = {};
        let x = {};
        const { value } = e.target;
        obj = allocated;

        for (let x = 0; x < options.length; x++) {
        if (id === x) {
            key = options[x]["child_pn"];
            if (
            options[x]["original_allocate"] < options[x]["allocate"] ||
            parseInt(value) > options[x]["allocate"]
            ) {
            if (selectedPrevInvUID === "") {
                console.log("prevValue here if if", value, options[x]["allocate"]);
                setAllocationQty(parseInt(value) - options[x]["allocate"]);

                console.log(options[x]["inv_uid"]);
                setOptions((option) =>
                option?.map((list, index) =>
                    index === id || list["inv_uid"] === invID
                    ? {
                        ...list,
                        allocate: value,
                        allocated: value * list["RequiredQty"],
                        allocatable:
                            list["inv_qty"] -
                            list["previously_allocated"] -
                            parseInt(value),
                        }
                    : list
                )
                );
                console.log("prevValue here if if", value, options[x], al);
                for (let j = 0; j < options.length; j++) {
                if (options[x]["inv_uid"] === options[j]["inv_uid"]) {
                    al = value * options[j]["RequiredQty"];
                    key =
                    options[j]["child_pn"] +
                    "-" +
                    options[j]["child_lft"] +
                    "-" +
                    j;
                    if (Object.keys(obj).includes(key)) {
                    obj[key] = al;
                    }
                    console.log("prevValue here if if", obj, al);
                    setAllocated(obj);
                }
                }

                setSelectedPrevInvUID(options[x]["inv_uid"]);
            } else if (selectedPrevInvUID === options[x]["inv_uid"]) {
                console.log(
                "prevValue here if else if",
                value,
                options[x]["allocate"]
                );
                setAllocationQty(allocationQty + 1);
                console.log(options[x]["inv_uid"]);
                setOptions((option) =>
                option?.map((list, index) =>
                    index === id || list["inv_uid"] === invID
                    ? {
                        ...list,
                        allocate: value,
                        allocated: value * list["RequiredQty"],
                        allocatable:
                            list["inv_qty"] -
                            list["previously_allocated"] -
                            parseInt(value),
                        }
                    : list
                )
                );

                for (let j = 0; j < options.length; j++) {
                if (options[x]["inv_uid"] === options[j]["inv_uid"]) {
                    al = value * options[j]["RequiredQty"];
                    key =
                    options[j]["child_pn"] +
                    "-" +
                    options[j]["child_lft"] +
                    "-" +
                    j;
                    if (Object.keys(obj).includes(key)) {
                    obj[key] = al;
                    }
                    console.log(al);
                    setAllocated(obj);
                }
                }

                setSelectedPrevInvUID(options[x]["inv_uid"]);
            } else {
                console.log(
                "prevValue here if else",
                value,
                options[x]["allocate"]
                );
                setAllocationQty(allocationQty + 1);
                console.log(options[x]["inv_uid"]);
                setOptions((option) =>
                option?.map((list, index) =>
                    index === id || list["inv_uid"] === invID
                    ? {
                        ...list,
                        allocate: value,
                        allocated: value * list["RequiredQty"],
                        allocatable:
                            list["inv_qty"] -
                            list["previously_allocated"] -
                            parseInt(value),
                        }
                    : list
                )
                );

                for (let j = 0; j < options.length; j++) {
                if (options[x]["inv_uid"] === options[j]["inv_uid"]) {
                    al = value * options[j]["RequiredQty"];
                    key =
                    options[j]["child_pn"] +
                    "-" +
                    options[j]["child_lft"] +
                    "-" +
                    j;
                    if (Object.keys(obj).includes(key)) {
                    obj[key] = al;
                    }

                    console.log(al);
                    setAllocated(obj);
                }
                }

                setSelectedPrevInvUID(options[x]["inv_uid"]);
            }
            } else if (
            options[x]["allocate"] <= options[x]["original_allocate"] &&
            parseInt(value) < options[x]["allocate"] &&
            options[x]["allocate"] > 0
            ) {
            if (selectedPrevInvUID === "") {
                console.log(
                "prevValue here else if if",
                value,
                options[x]["allocate"]
                );
                setAllocationQty(parseInt(value) - options[x]["allocate"]);
                console.log(options[x]["inv_uid"]);
                setOptions((option) =>
                option?.map((list, index) =>
                    index === id || list["inv_uid"] === invID
                    ? {
                        ...list,
                        allocate: value,
                        allocated: value * list["RequiredQty"],
                        allocatable: list["allocatable"] + 1,
                        }
                    : list
                )
                );
                console.log(" prevValue here else if if", options[x]);
                for (let j = 0; j < options.length; j++) {
                if (options[x]["inv_uid"] === options[j]["inv_uid"]) {
                    al = value * options[j]["RequiredQty"];
                    key =
                    options[j]["child_pn"] +
                    "-" +
                    options[j]["child_lft"] +
                    "-" +
                    j;
                    if (Object.keys(obj).includes(key)) {
                    obj[key] = al;
                    }
                    console.log("prevValue here if if", obj, al);
                    setAllocated(obj);
                }
                }

                setSelectedPrevInvUID(options[x]["inv_uid"]);
            } else if (selectedPrevInvUID === options[x]["inv_uid"]) {
                console.log(
                "prevValue here else if else if",
                value,
                options[x]["allocate"]
                );
                setAllocationQty(allocationQty - 1);
                console.log(options[x]["inv_uid"]);
                setOptions((option) =>
                option?.map((list, index) =>
                    index === id || list["inv_uid"] === invID
                    ? {
                        ...list,
                        allocate: value,
                        allocated: value * list["RequiredQty"],
                        allocatable: list["allocatable"] + 1,
                        }
                    : list
                )
                );
                for (let j = 0; j < options.length; j++) {
                if (options[x]["inv_uid"] === options[j]["inv_uid"]) {
                    al = value * options[j]["RequiredQty"];
                    key =
                    options[j]["child_pn"] +
                    "-" +
                    options[j]["child_lft"] +
                    "-" +
                    j;
                    if (Object.keys(obj).includes(key)) {
                    obj[key] = al;
                    }
                    console.log("prevValue here if if", obj, al);
                    setAllocated(obj);
                }
                }

                setSelectedPrevInvUID(options[x]["inv_uid"]);
            } else {
                console.log("prevValue here else if else");
                setAllocationQty(allocationQty - 1);
                console.log(options[x]["inv_uid"]);
                setOptions((option) =>
                option?.map((list, index) =>
                    index === id || list["inv_uid"] === invID
                    ? {
                        ...list,
                        allocate: value,
                        allocated: value * list["RequiredQty"],
                        allocatable: list["allocatable"] + 1,
                        }
                    : list
                )
                );
                for (let j = 0; j < options.length; j++) {
                if (options[x]["inv_uid"] === options[j]["inv_uid"]) {
                    al = value * options[j]["RequiredQty"];
                    key =
                    options[j]["child_pn"] +
                    "-" +
                    options[j]["child_lft"] +
                    "-" +
                    j;
                    if (Object.keys(obj).includes(key)) {
                    obj[key] = al;
                    }
                    console.log("prevValue here if if", obj, al);
                    setAllocated(obj);
                }
                }

                setSelectedPrevInvUID(options[x]["inv_uid"]);
            }
            } else if (parseInt(options[x]["allocate"]) === 0) {
            setAllocationQty(0);
            let ac = 0;
            console.log("here if options 0");
            if (selectedPrevInvUID === "") {
                console.log(
                "prevValue here else if if",
                value,
                options[x]["allocate"],
                allocationQty
                );
                setAllocationQty(parseInt(value) - options[x]["allocate"]);
                console.log(options[x]["inv_uid"]);
                setOptions((option) =>
                option?.map((list, index) =>
                    index === id || list["inv_uid"] === invID
                    ? {
                        ...list,
                        allocate: value,
                        allocated: value * list["RequiredQty"],
                        allocatable: list["allocatable"] - 1,
                        }
                    : list
                )
                );
                console.log("prevValue here else if if", value, options[x]);
                for (let j = 0; j < options.length; j++) {
                if (options[x]["inv_uid"] === options[j]["inv_uid"]) {
                    al = value * options[j]["RequiredQty"];
                    key =
                    options[j]["child_pn"] +
                    "-" +
                    options[j]["child_lft"] +
                    "-" +
                    j;
                    if (Object.keys(obj).includes(key)) {
                    obj[key] = al;
                    }
                    console.log("prevValue here if if", obj, al);
                    setAllocated(obj);
                }
                }

                setSelectedPrevInvUID(options[x]["inv_uid"]);
            } else if (selectedPrevInvUID === options[x]["inv_uid"]) {
                console.log(
                "prevValue here else if else if",
                value,
                options[x]["allocate"]
                );
                setAllocationQty(allocationQty + 1);
                console.log(options[x]["inv_uid"]);
                setOptions((option) =>
                option?.map((list, index) =>
                    index === id || list["inv_uid"] === invID
                    ? {
                        ...list,
                        allocate: value,
                        allocated: value * list["RequiredQty"],
                        allocatable: list["allocatable"] - 1,
                        }
                    : list
                )
                );
                console.log("prevValue here else if else if", options[x]);
                for (let j = 0; j < options.length; j++) {
                if (options[x]["inv_uid"] === options[j]["inv_uid"]) {
                    al = value * options[j]["RequiredQty"];
                    key =
                    options[j]["child_pn"] +
                    "-" +
                    options[j]["child_lft"] +
                    "-" +
                    j;
                    if (Object.keys(obj).includes(key)) {
                    obj[key] = al;
                    }
                    console.log("prevValue here if if", obj, al);
                    setAllocated(obj);
                }
                }

                setSelectedPrevInvUID(options[x]["inv_uid"]);
            } else {
                console.log(
                "prevValue here else if else",
                value,
                options[x]["allocate"]
                );
                setAllocationQty(allocationQty + 1);
                console.log(options[x]["inv_uid"]);
                setOptions((option) =>
                option?.map((list, index) =>
                    index === id || list["inv_uid"] === invID
                    ? {
                        ...list,
                        allocate: value,
                        allocated: value * list["RequiredQty"],
                        allocatable: list["allocatable"] - 1,
                        }
                    : list
                )
                );
                console.log("prevValue here else if else", options[x]);
                for (let j = 0; j < options.length; j++) {
                if (options[x]["inv_uid"] === options[j]["inv_uid"]) {
                    al = value * options[j]["RequiredQty"];
                    key =
                    options[j]["child_pn"] +
                    "-" +
                    options[j]["child_lft"] +
                    "-" +
                    j;
                    if (Object.keys(obj).includes(key)) {
                    obj[key] = al;
                    }
                    console.log("prevValue here if if", obj, al);
                    setAllocated(obj);
                }
                }

                setSelectedPrevInvUID(options[x]["inv_uid"]);
            }
            } else {
            if (allocationQty >= 0) {
                if (selectedPrevInvUID === "") {
                console.log(
                    "prevValue here else if if",
                    value,
                    options[x]["allocate"]
                );
                setAllocationQty(parseInt(value) - options[x]["allocate"]);

                console.log(options[x]["inv_uid"]);
                setOptions((option) =>
                    option?.map((list, index) =>
                    index === id || list["inv_uid"] === invID
                        ? {
                            ...list,
                            allocate: value,
                            allocated: value * list["RequiredQty"],
                            allocatable: list["allocatable"] - 1,
                        }
                        : list
                    )
                );
                console.log(" prevValue here if if", options[x]);
                for (let j = 0; j < options.length; j++) {
                    if (options[x]["inv_uid"] === options[j]["inv_uid"]) {
                    al = value * options[j]["RequiredQty"];
                    key =
                        options[j]["child_pn"] +
                        "-" +
                        options[j]["child_lft"] +
                        "-" +
                        j;
                    if (Object.keys(obj).includes(key)) {
                        obj[key] = al;
                    }
                    console.log("prevValue here if if", obj, al);
                    setAllocated(obj);
                    }
                }

                setSelectedPrevInvUID(options[x]["inv_uid"]);
                } else if (selectedPrevInvUID === options[x]["inv_uid"]) {
                console.log(
                    "prevValue here if else if",
                    value,
                    options[x]["allocate"]
                );
                setAllocationQty(allocationQty + 1);

                console.log(options[x]["inv_uid"]);
                setOptions((option) =>
                    option?.map((list, index) =>
                    index === id || list["inv_uid"] === invID
                        ? {
                            ...list,
                            allocate: value,
                            allocated: value * list["RequiredQty"],
                            allocatable: list["allocatable"] - 1,
                        }
                        : list
                    )
                );
                for (let j = 0; j < options.length; j++) {
                    if (options[x]["inv_uid"] === options[j]["inv_uid"]) {
                    al = value * options[j]["RequiredQty"];
                    key =
                        options[j]["child_pn"] +
                        "-" +
                        options[j]["child_lft"] +
                        "-" +
                        j;
                    if (Object.keys(obj).includes(key)) {
                        obj[key] = al;
                    }
                    console.log("prevValue here if if", obj, al);
                    setAllocated(obj);
                    }
                }

                setSelectedPrevInvUID(options[x]["inv_uid"]);
                } else {
                console.log("prevValue here if else");
                setAllocationQty(allocationQty + 1);

                console.log(options[x]["inv_uid"]);
                setOptions((option) =>
                    option?.map((list, index) =>
                    index === id || list["inv_uid"] === invID
                        ? {
                            ...list,
                            allocate: value,
                            allocated: value * list["RequiredQty"],
                            allocatable: list["allocatable"] - 1,
                        }
                        : list
                    )
                );
                for (let j = 0; j < options.length; j++) {
                    if (options[x]["inv_uid"] === options[j]["inv_uid"]) {
                    al = value * options[j]["RequiredQty"];
                    key =
                        options[j]["child_pn"] +
                        "-" +
                        options[j]["child_lft"] +
                        "-" +
                        j;
                    if (Object.keys(obj).includes(key)) {
                        obj[key] = al;
                    }
                    console.log("prevValue here if if", obj, al);
                    setAllocated(obj);
                    }
                }

                setSelectedPrevInvUID(options[x]["inv_uid"]);
                }
            } else {
                if (selectedPrevInvUID === "") {
                console.log(
                    "prevValue here else if if",
                    value,
                    options[x]["allocate"]
                );
                setAllocationQty(parseInt(value) - options[x]["allocate"] - 1);

                console.log(options[x]["inv_uid"]);
                setOptions((option) =>
                    option?.map((list, index) =>
                    index === id || list["inv_uid"] === invID
                        ? {
                            ...list,
                            allocate: value,
                            allocated: value * list["RequiredQty"],
                            allocatable: list["allocatable"] + 1,
                        }
                        : list
                    )
                );
                console.log(" prevValue here else if if", options[x]);
                for (let j = 0; j < options.length; j++) {
                    if (options[x]["inv_uid"] === options[j]["inv_uid"]) {
                    al = value * options[j]["RequiredQty"];
                    key =
                        options[j]["child_pn"] +
                        "-" +
                        options[j]["child_lft"] +
                        "-" +
                        j;
                    if (Object.keys(obj).includes(key)) {
                        obj[key] = al;
                    }
                    console.log("prevValue here if if", obj, al);
                    setAllocated(obj);
                    }
                }

                setSelectedPrevInvUID(options[x]["inv_uid"]);
                } else if (selectedPrevInvUID === options[x]["inv_uid"]) {
                console.log(
                    "prevValue here else if else if",
                    value,
                    options[x]["allocate"]
                );
                setAllocationQty(allocationQty - 1);

                console.log(options[x]["inv_uid"]);
                setOptions((option) =>
                    option?.map((list, index) =>
                    index === id || list["inv_uid"] === invID
                        ? {
                            ...list,
                            allocate: value,
                            allocated: value * list["RequiredQty"],
                            allocatable: list["allocatable"] + 1,
                        }
                        : list
                    )
                );
                for (let j = 0; j < options.length; j++) {
                    if (options[x]["inv_uid"] === options[j]["inv_uid"]) {
                    al = value * options[j]["RequiredQty"];
                    key =
                        options[j]["child_pn"] +
                        "-" +
                        options[j]["child_lft"] +
                        "-" +
                        j;
                    if (Object.keys(obj).includes(key)) {
                        obj[key] = al;
                    }
                    console.log("prevValue here if if", obj, al);
                    setAllocated(obj);
                    }
                }

                setSelectedPrevInvUID(options[x]["inv_uid"]);
                } else {
                console.log("prevValue here else if else");
                setAllocationQty(allocationQty - 1);

                console.log(options[x]["inv_uid"]);
                setOptions((option) =>
                    option?.map((list, index) =>
                    index === id || list["inv_uid"] === invID
                        ? {
                            ...list,
                            allocate: value,
                            allocated: value * list["RequiredQty"],
                            allocatable: list["allocatable"] + 1,
                        }
                        : list
                    )
                );
                for (let j = 0; j < options.length; j++) {
                    if (options[x]["inv_uid"] === options[j]["inv_uid"]) {
                    al = value * options[j]["RequiredQty"];
                    key =
                        options[j]["child_pn"] +
                        "-" +
                        options[j]["child_lft"] +
                        "-" +
                        j;
                    if (Object.keys(obj).includes(key)) {
                        obj[key] = al;
                    }
                    console.log("prevValue here if if", obj, al);
                    setAllocated(obj);
                    }
                }

                setSelectedPrevInvUID(options[x]["inv_uid"]);
                }
            }
            }
        }

        console.log("allocated", allocated);
        }

        let y = Object.keys(obj);
        let k2 = "";
        let finalObj = {};
        for (let i = 0; i < options.length; i++) {
        k2 = options[i]["child_pn"];
        //  finalObj[k2] = 0;
        finalObj[k2] = 0;
        }
        let k = "";
        for (let z = 0; z < y.length; z++) {
        k = y[z].split("-")[0];
        if (Object.keys(finalObj).includes(k)) {
            finalObj[k] = finalObj[k] + allocated[y[z]];
        }
        }
        console.log("outside for loop", allocated, finalObj);
        setFinalAllocated(finalObj);
    };

    let changeRawInvAllocate = (id, invID, e) => {
        let al = 0;
        const { value } = e.target;

        for (let x = 0; x < Rows.length; x++) {
        if (id === x) {
            if (parseInt(value) > Rows[x]["allocate_input"]) {
            if (selectedPrevInvUID === "") {
                setRows((option) =>
                option?.map((list, index) =>
                    index === id
                    ? {
                        ...list,
                        allocate_input: value,
                        final_order_qty: list["final_order_qty"] - 1,
                        }
                    : list
                )
                );
            } else if (selectedPrevInvUID === Rows[x]["part_uid"]) {
                setRows((option) =>
                option?.map((list, index) =>
                    index === id
                    ? {
                        ...list,
                        allocate_input: value,
                        final_order_qty: list["final_order_qty"] - 1,
                        }
                    : list
                )
                );
            } else {
                setRows((option) =>
                option?.map((list, index) =>
                    index === id
                    ? {
                        ...list,
                        allocate_input: value,
                        final_order_qty: list["final_order_qty"] - 1,
                        }
                    : list
                )
                );
            }
            } else if (parseInt(value) < Rows[x]["allocate_input"]) {
            if (selectedPrevInvUID === "") {
                setRows((option) =>
                option?.map((list, index) =>
                    index === id
                    ? {
                        ...list,
                        allocate_input: value,
                        final_order_qty: list["final_order_qty"] + 1,
                        }
                    : list
                )
                );
            } else if (selectedPrevInvUID === Rows[x]["part_uid"]) {
                setRows((option) =>
                option?.map((list, index) =>
                    index === id
                    ? {
                        ...list,
                        allocate_input: value,
                        final_order_qty: list["final_order_qty"] + 1,
                        }
                    : list
                )
                );
            } else {
                setRows((option) =>
                option?.map((list, index) =>
                    index === id
                    ? {
                        ...list,
                        allocate_input: value,
                        final_order_qty: list["final_order_qty"] + 1,
                        }
                    : list
                )
                );
            }
            } else {
            setRows((option) =>
                option?.map((list, index) =>
                index === id
                    ? {
                        ...list,
                        allocate_input: value,
                        final_order_qty: list["final_order_qty"] - 1,
                    }
                    : list
                )
            );
            }

            if (parseInt(value) > Rows[x]["allocate_input"]) {
            if (selectedPrevInvUID === "") {
                console.log(
                "prevValue here if if",
                value,
                Rows[x]["allocate_input"]
                );
                setAllocationQty(parseInt(value));
                console.log(Rows[x]["part_uid"]);
                setRows((option) =>
                option?.map((list, index) =>
                    index === id || list["part_uid"] === invID
                    ? {
                        ...list,
                        available_inv: parseInt(list["available_inv"]) - 1,
                        }
                    : list
                )
                );
                console.log("prevValue here if if", value, Rows[x], al);

                setSelectedPrevInvUID(Rows[x]["part_uid"]);
            } else if (selectedPrevInvUID === Rows[x]["part_uid"]) {
                console.log(
                "prevValue here if else if",
                value,
                Rows[x]["allocate_input"]
                );
                setAllocationQty(allocationQty + 1);
                console.log(Rows[x]["part_uid"]);
                setRows((option) =>
                option?.map((list, index) =>
                    index === id || list["part_uid"] === invID
                    ? {
                        ...list,
                        available_inv: parseInt(list["available_inv"]) - 1,
                        }
                    : list
                )
                );

                setSelectedPrevInvUID(Rows[x]["part_uid"]);
            } else {
                console.log(
                "prevValue here if else",
                value,
                Rows[x]["allocate_input"]
                );
                setAllocationQty(allocationQty + 1);
                console.log(Rows[x]["part_uid"]);
                setRows((option) =>
                option?.map((list, index) =>
                    index === id || list["part_uid"] === invID
                    ? {
                        ...list,
                        available_inv: parseInt(list["available_inv"]) - 1,
                        }
                    : list
                )
                );

                setSelectedPrevInvUID(Rows[x]["part_uid"]);
            }
            } else if (
            parseInt(value) < Rows[x]["allocate_input"] &&
            Rows[x]["allocate_input"] > 0
            ) {
            if (selectedPrevInvUID === "") {
                console.log(
                "prevValue here else if if",
                value,
                Rows[x]["allocate_input"]
                );
                setAllocationQty(parseInt(value) - Rows[x]["allocate_input"]);
                console.log(Rows[x]["part_uid"]);
                setRows((option) =>
                option?.map((list, index) =>
                    index === id || list["part_uid"] === invID
                    ? {
                        ...list,
                        available_inv: parseInt(list["available_inv"]) + 1,
                        }
                    : list
                )
                );
                console.log(" prevValue here else if if", Rows[x]);

                setSelectedPrevInvUID(Rows[x]["part_uid"]);
            } else if (selectedPrevInvUID === Rows[x]["part_uid"]) {
                console.log(
                "prevValue here else if else if",
                value,
                Rows[x]["allocate_input"]
                );
                setAllocationQty(allocationQty - 1);
                console.log(Rows[x]["part_uid"]);
                setRows((option) =>
                option?.map((list, index) =>
                    index === id || list["part_uid"] === invID
                    ? {
                        ...list,
                        available_inv: parseInt(list["available_inv"]) + 1,
                        }
                    : list
                )
                );

                setSelectedPrevInvUID(Rows[x]["part_uid"]);
            } else {
                console.log("prevValue here else if else");
                setAllocationQty(allocationQty - 1);
                console.log(Rows[x]["part_uid"]);
                setRows((option) =>
                option?.map((list, index) =>
                    index === id || list["part_uid"] === invID
                    ? {
                        ...list,
                        available_inv: parseInt(list["available_inv"]) + 1,
                        }
                    : list
                )
                );

                setSelectedPrevInvUID(Rows[x]["part_uid"]);
            }
            } else if (parseInt(Rows[x]["allocate_input"]) === 0) {
            setAllocationQty(0);
            let ac = 0;
            console.log("here if Rows 0");
            if (selectedPrevInvUID === "") {
                console.log(
                "prevValue here else if if",
                value,
                Rows[x]["allocate_input"],
                allocationQty
                );
                setAllocationQty(parseInt(value) - Rows[x]["allocate_input"]);
                console.log(Rows[x]["part_uid"]);
                setRows((option) =>
                option?.map((list, index) =>
                    index === id || list["part_uid"] === invID
                    ? {
                        ...list,
                        available_inv: list["inventory"] - value,
                        }
                    : list
                )
                );
                console.log("prevValue here else if if", value, Rows[x]);

                setSelectedPrevInvUID(Rows[x]["part_uid"]);
            } else if (selectedPrevInvUID === Rows[x]["part_uid"]) {
                console.log(
                "prevValue here else if else if",
                value,
                Rows[x]["allocate_input"]
                );
                setAllocationQty(allocationQty + 1);
                console.log(Rows[x]["part_uid"]);
                setRows((option) =>
                option?.map((list, index) =>
                    index === id || list["part_uid"] === invID
                    ? {
                        ...list,
                        available_inv: list["inventory"] - value,
                        }
                    : list
                )
                );
                console.log("prevValue here else if else if", Rows[x]);

                setSelectedPrevInvUID(Rows[x]["part_uid"]);
            } else {
                console.log(
                "prevValue here else if else",
                value,
                Rows[x]["allocate_input"]
                );
                setAllocationQty(allocationQty + 1);
                console.log(Rows[x]["part_uid"]);
                setRows((option) =>
                option?.map((list, index) =>
                    index === id || list["part_uid"] === invID
                    ? {
                        ...list,
                        available_inv: list["inventory"] - value,
                        }
                    : list
                )
                );
                console.log("prevValue here else if else", Rows[x]);

                setSelectedPrevInvUID(Rows[x]["part_uid"]);
            }
            } else {
            if (allocationQty >= 0) {
                if (selectedPrevInvUID === "") {
                console.log(
                    "prevValue here else if if",
                    value,
                    Rows[x]["allocate_input"]
                );
                setAllocationQty(parseInt(value) - Rows[x]["allocate_input"]);
                console.log(Rows[x]["part_uid"]);
                setRows((option) =>
                    option?.map((list, index) =>
                    index === id || list["part_uid"] === invID
                        ? {
                            ...list,
                            available_inv: list["inventory"] - value,
                        }
                        : list
                    )
                );
                console.log(" prevValue here if if", Rows[x]);

                setSelectedPrevInvUID(Rows[x]["part_uid"]);
                } else if (selectedPrevInvUID === Rows[x]["part_uid"]) {
                console.log(
                    "prevValue here if else if",
                    value,
                    Rows[x]["allocate_input"]
                );
                setAllocationQty(allocationQty + 1);
                console.log(Rows[x]["part_uid"]);
                setRows((option) =>
                    option?.map((list, index) =>
                    index === id || list["part_uid"] === invID
                        ? {
                            ...list,
                            available_inv: list["inventory"] - value,
                        }
                        : list
                    )
                );

                setSelectedPrevInvUID(Rows[x]["part_uid"]);
                } else {
                console.log("prevValue here if else");
                setAllocationQty(allocationQty + 1);
                console.log(Rows[x]["part_uid"]);
                setRows((option) =>
                    option?.map((list, index) =>
                    index === id || list["part_uid"] === invID
                        ? {
                            ...list,
                            available_inv: list["inventory"] - value,
                        }
                        : list
                    )
                );

                setSelectedPrevInvUID(Rows[x]["part_uid"]);
                }
            } else {
                if (selectedPrevInvUID === "") {
                console.log(
                    "prevValue here else if if",
                    value,
                    Rows[x]["allocate_input"]
                );
                setAllocationQty(parseInt(value) - Rows[x]["allocate_input"] - 1);
                console.log(Rows[x]["part_uid"]);
                setRows((option) =>
                    option?.map((list, index) =>
                    index === id || list["part_uid"] === invID
                        ? {
                            ...list,
                            available_inv: list["inventory"] - value,
                        }
                        : list
                    )
                );
                console.log(" prevValue here else if if", Rows[x]);

                setSelectedPrevInvUID(Rows[x]["part_uid"]);
                } else if (selectedPrevInvUID === Rows[x]["part_uid"]) {
                console.log(
                    "prevValue here else if else if",
                    value,
                    Rows[x]["allocate_input"]
                );
                setAllocationQty(allocationQty - 1);
                console.log(Rows[x]["part_uid"]);
                setRows((option) =>
                    option?.map((list, index) =>
                    index === id || list["part_uid"] === invID
                        ? {
                            ...list,
                            available_inv: list["inventory"] - value,
                        }
                        : list
                    )
                );

                setSelectedPrevInvUID(Rows[x]["part_uid"]);
                } else {
                console.log("prevValue here else if else");
                setAllocationQty(allocationQty - 1);
                console.log(Rows[x]["part_uid"]);
                setRows((option) =>
                    option?.map((list, index) =>
                    index === id || list["part_uid"] === invID
                        ? {
                            ...list,
                            available_inv: list["inventory"] - value,
                        }
                        : list
                    )
                );

                setSelectedPrevInvUID(Rows[x]["part_uid"]);
                }
            }
            }
        }
        }
    };

    let changeDesired_Date = (e) => {
        setDesired_Date(e.target.value);
        console.log(e.target.value);
    };
    let onFileChange = (event) => {
        // Update the state
        //this.setState({ selectedFile: event.target.files[0] });
        setSelectedFile(event.target.files[0]);
    };

    function updateTable() {
        if(Desired_Qty === null || Desired_Qty === undefined || Desired_Qty === "") {
            alert("Please enter a desired quantity before proceeding")
            return
        }
        if(Desired_Date === null || Desired_Date === undefined) {
            alert("Please enter a desired date before proceeding")
            return
        }
        // event.preventDefault();
        let x = 0;
        let sum = 0;
        let rows = [];
        let data = [];
        console.log(Info.length);

        const postURL =
        "https://tn5e0l3yok.execute-api.us-west-1.amazonaws.com/dev/api/v2/RunOrderList";
        const payload = {
        product_uid: productId,
        product: Top_Level,
        qty: Desired_Qty,
        location: country,
        };

        axios.post(postURL, payload).then((res) => {
        const postURL2 =
            "https://tn5e0l3yok.execute-api.us-west-1.amazonaws.com/dev/api/v2/GetParts";
        const postURL3 =
            "https://tn5e0l3yok.execute-api.us-west-1.amazonaws.com/dev/api/v2/GetAllocation/";
        axios.get(postURL2).then((response) => {
            axios
            .get(
                `https://tn5e0l3yok.execute-api.us-west-1.amazonaws.com/dev/api/v2/GetAllocation/${productId}`
            )
            .then((resp) => {
                console.log(resp);
                var alObj = resp.data;
                var allParts = response.data;
                setAllocationObject(resp.data);

                console.log("in get Json object");
                // console.log(res);

                if (res.data.ctb[0] != null) {
                setBom(res.data.ctb);
                setAllocate(res.data.allocation);
                //setData(res.data);
                for (let i in res.data.ctb) {
                    // console.log(i);
                    // console.log(res.data.ctb[i].GrandParent_BOM_pn);
                    // console.log(Top_Level);
                    if (res.data.ctb[i].GrandParent_BOM_pn === Top_Level) {
                    data.push(res.data.ctb[i]);
                    }
                }
                console.log(data);
                var list = []; //Define the list of seen children
                var sth = []; //Define the list of ouput rows
                for (let i in data) {
                    // if (list.includes(data[i].child_pn)) {
                    list.push(data[i].child_pn);
                    var tempInv = 0;
                    var allocatable = 0;
                    var allocated = 0;
                    var delta2_qty = 0;
                    var final_order_qty = 0;
                    var unitCost = 0;
                    var tempUID = 0;
                    var order_Qty = 0;
                    var allocate_input = 0;
                    var original_allocate = 0;
                    var total_allocate = 0;
                    for (let j in inventory) {
                    if (
                        inventory[j].inv_pn === data[i].child_pn &&
                        inventory[j].inv_loc == country
                    ) {
                        tempInv += inventory[j].inv_qty;
                        tempUID = inventory[j].inv_uid;
                    }
                    }
                    let allocate = res.data.allocation;
                    console.log(allocate);
                    order_Qty = data[i].RequiredQty - data[i].childInv;
                    for (let j in allocate) {
                    if (
                        allocate[j].child_pn === data[i].child_pn &&
                        allocate[j].child_lft === data[i].child_lft &&
                        allocate[j].inv_available_date < Desired_Date
                    ) {
                        allocatable += allocate[j].SubAssyQty;
                    }
                    }
                    // let alObj = allocationObject;
                    console.log(alObj);
                    for (let j in alObj) {
                    if (
                        alObj[j].child_pn === data[i].child_pn &&
                        alObj[j].child_lft === data[i].child_lft
                    ) {
                        allocated += alObj[j].allocated_qty;
                    }
                    }
                    for (let j in alObj) {
                    if (
                        alObj[j].Allocation_inventory_uid === tempUID &&
                        alObj[j].Allocation_assy_name === data[i].child_pn &&
                        parseInt(alObj[j].Allocation_assy_lft) === data[i].child_lft
                    ) {
                        allocate_input += alObj[j]["sum(Allocation_allocated_qty)"];
                        original_allocate +=
                        alObj[j]["sum(Allocation_allocated_qty)"];
                    }
                    }
                    for (let j in alObj) {
                    if (
                        alObj[j].Allocation_inventory_uid === tempUID &&
                        alObj[j].Allocation_assy_name === data[i].child_pn
                    ) {
                        total_allocate += alObj[j]["sum(Allocation_allocated_qty)"];
                    }
                    }
                    delta2_qty = order_Qty - allocated;

                    for (let j in allParts) {
                    if (allParts[j].PN === data[i].child_pn) {
                        unitCost = allParts[j].Unit_Cost;
                    }
                    }

                    var avaiInv = 0;
                    avaiInv = tempInv - total_allocate;
                    final_order_qty = delta2_qty - allocate_input;
                    var row = new RowData(
                    tempUID,
                    data[i].child_pn + "-" + String(data[i].child_lft),
                    data[i].QtyPerAssembly,
                    data[i].RequiredQty,
                    data[i].childInv,
                    order_Qty,
                    allocatable,
                    allocated,
                    delta2_qty,
                    tempInv,
                    avaiInv,
                    allocate_input,
                    final_order_qty,
                    unitCost,
                    10,
                    original_allocate
                    );
                    // console.log(row);
                    rows.push(row);
                    // } else {
                    //   //update the value of reqQty
                    //   rows.find((r) => r.part === data[i].child_pn).qty_per +=
                    //     data[i].RequiredQty;
                    // }
                }

                for (let i in rows) {
                    rows[i].need_qty = rows[i].qty_per * Desired_Qty;
                    // rows[i].order_qty = Math.max(
                    //   0,
                    //   data[i].RequiredQty - data[i].subAssemblyQty - data[i].rawInv
                    // );
                    rows[i].order_qty = Math.max(
                    0,
                    data[i].RequiredQty - data[i].childInv
                    );
                    rows[i].total_price = rows[i].unit_price * rows[i].order_qty;
                    rows[i].total_price = rows[i].total_price.toFixed(2);
                }
                setRows(rows);
                console.log(rows);
                } else {
                console.log("bad");
                //this.setState({ data: "Please enter a valid Product UID" });

                //setData("Please enter a valid Product UID")
                }
            });
        });
        });
        setAllocationQty(0);
        setAllocated({});
        setFinalAllocated({});
        setSelectedPrevInvUID("");
        //Create a list of bom object that has GP == A
    }

    async function onFileUpload() {
        // Create an object of formData
        const payload =
        "https://tn5e0l3yok.execute-api.us-west-1.amazonaws.com/dev/api/v2/ImportFile";
        const formData = new FormData();

        // Update the formData object
        formData.append("filepath", selectedFile, selectedFile.name);

        // Details of the uploaded file
        // console.log(this.state.selectedFile);

        // Request made to the backend api
        // Send formData object
        await axios.post(payload, formData).then((response) => {
        // console.log('###')
        console.log(response);
        console.log(response.data);
        // this.setState({
        //     productId: response.data,
        // })
        setProductId(response.data);
        //console.log(this.state.tempUID);
        console.log(productId);
        // const postURL = "https://tn5e0l3yok.execute-api.us-west-1.amazonaws.com/dev/api/v2/RunCTB"
        // const payload = {
        //     "product_uid": response.data
        // }
        // axios.post(postURL, payload).then((res) => {
        //     console.log("in get Json object");
        //     console.log(res);
        //     console.log(res.data[0]);
        //     if(res.data[0]!=null) {
        //         this.setState({ data: res.data });
        //         //setData(res.data);

        //     }
        //     else {
        //         console.log("bad");
        //         this.setState({ data: "Please enter a valid Product UID" });
        //         //setData("Please enter a valid Product UID")
        //     }
        });
        await axios.get(baseURL).then((response) => {
        setInfo(response.data);
        console.log("hi");
        //document.getElementById('box1').selectedIndex = response.data.length -1;
        setTimeout(() => {
            var len = response.data.length - 1;
            document.getElementById("box1").selectedIndex = len;
            document.getElementById("box2").selectedIndex = len;

            let parents = response.data.map((a) => a.product_parents);
            setParent(parents[document.getElementById("box1").selectedIndex]);
            // setTop_Level("A");
            setTop_Level(splitString(parent)[0])
            console.log("parent 1", splitString(parent)[0])
            console.log("Parent 1.1", splitString(parents[0])[0])


            //let parents = Info.map(a => a.product_parents);
            //setParent(parents[document.getElementById('box1').selectedIndex]);
        });
        //var len = response.data.length;
        // while(len>Info.length) {
        //      len -= 0.1;
        //      //console.log(len + "  " + Info.length);
        //  }
        });
        console.log("reached set info");
        console.log(Info);
        console.log(Info.length);
        //document.getElementById('box2').selectedIndex = -1;

        // console.log(response.data);
        // console.log(response.status);
        // console.log(response.statusText);
        // console.log(response.headers);
        // console.log(response.config);
        //         fetch(PRODUCTS_API_URL)
        // .then(response => response.json()).then(response => {
        //             console.log(response);
        //             console.log(response[response.length - 1]);
        //             this.setState({

        //                 products: response
        //             })
        //             console.log(this.products);
        //         })

        //     }, (error) => {
        //         console.log(error);
        //     });
    }

    const buyParts = () => {
        console.log("Rows", Rows)
        let summary = {}
        for(let i = 0; i < Rows.length; i++) {
            console.log("Rows", i, "quantity: ", Rows[i])
            // console.log("partuid", Rows[i].part)
            // split
            const lastIndex = Rows[i].part.lastIndexOf('-')
            const part_id = Rows[i].part.slice(0, lastIndex)
            console.log("Part_id", part_id)

            if(!summary.hasOwnProperty(part_id)){
                console.log("New entry in summary:", Rows[i].part_uid)
                summary[part_id] = {
                    part_uid: part_id,
                    quantity: Rows[i].final_order_qty,
                    total_price: Rows[i].total_price
                }
            } else {
                console.log("Adding to existing entry in summary:", Rows[i].part_uid)
                let existing_qty = summary[part_id].quantity
                let existing_price = parseFloat(summary[part_id].total_price)

                console.log("Existing Qty:", existing_qty, "Existing_Price:", existing_price)

                let new_qty = existing_qty + Rows[i].final_order_qty
                let new_price = existing_price + parseFloat(Rows[i].total_price)

                console.log("New Qty:", new_qty, "New Price:", new_price)
                summary[part_id] = {
                    part_uid: part_id,
                    quantity: new_qty,
                    total_price: new_price.toFixed(2).toString()
                }
            }
                
        }
        console.log("summary", summary)

        let summaryTable = []
        Object.keys(summary).forEach((key, index) => {
            console.log("key:", key, "value:", summary[key])
            summaryTable.push(summary[key])
        })
        console.log("Table", summaryTable)
        setOrderSummary(summaryTable)
    }


    // useEffect(() => {
    //     trackTable.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' }) 
    // }, [showTable])

    useEffect(() => {
        if(Rows.length !== 0) {
            setShowTable(true)
        }
    }, [Rows])
    
    return (
        <div>
            <Container fluid >
                <Row>
                    <HomepageNavbar/>
                </Row>
                <Form className="form-box">
                    <Row>
                        <h1 className="font30 form-item">Clear To Build</h1>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="formFile"  >  
                                <Form.Label>Bill of Materials (BOM)</Form.Label>
                                <Form.Control type="file" onChange={onFileChange}/>
                            </Form.Group>
                        </ Col>
                        <Col className={"d-flex flex-column text-center"}>
                            <Button variant="secondary" onClick={onFileUpload} className={"mt-auto"} style={{width: "10em"}}>
                                Upload BOM
                            </Button>{' '}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="form-item" >
                                <Form.Label>Select Product ID</Form.Label>
                                <Form.Select aria-label="Select Product ID" id="box1" onChange={changeBox2}>
                                    {Info.map((info) => (
                                        <option value={info.product_uid}>{info.product_uid}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="form-item">
                                <Form.Label>Select Product Description</Form.Label>
                                <Form.Select aria-label="Select Product Descendant" id="box2" onChange={changeBox1}>
                                    {Info.map((info) => (
                                        <option value={info.product_desc}>{info.product_desc}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="form-item">
                                <Form.Label>Select Product Parent</Form.Label>
                                <Form.Select aria-label="Select Product Parent" id="box3" onChange={changeTop_Level}>
                                    {splitString(parent).map((p) => (
                                        <option value={p}>{p}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="formQuantity" className="form-item">
                                <Form.Label>Desired Quantity</Form.Label>
                                <Form.Control 
                                    type="quantity" 
                                    placeholder="Enter Product's Desired Quantity" value={Desired_Qty}
                                    onChange={changeDesired_Qty}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="formQuantity" className="form-item">
                                <Form.Label>Desired Date</Form.Label>
                                <Form.Control 
                                    type="date" 
                                    placeholder="Select Desired Date" 
                                    value={Desired_Date}
                                    onChange={changeDesired_Date}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="form-item">
                                <Form.Label>Choose a Location</Form.Label>
                                <Form.Select 
                                    aria-label="Choose Location" 
                                    id="box4" 
                                    onChange={changeCountry}
                                >
                                    <option value="US">US</option>
                                    <option value="France">France</option>
                                    <option value="Germany">Germany</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Button variant="secondary" size="lg" className="form-btn" onClick={updateTable}>Run Clear To Build</Button>
                    </Row>
                    {/* <Row className="form-box">
                        { showTable ? 
                            <p>Scroll down to view table</p>
                            : <></>
                        }
                    </Row> */}
                </Form>
                <Row>
                    {showTable ?
                        <div>
                            <Row>
                                <h1 className="font30 form-item">Product {Top_Level} Qty {Desired_Qty}</h1>
                                <Table striped bordered hover className="table" ref={trackTable}>
                                    <thead>
                                        <tr>
                                            <th>Part ID</th>
                                            <th>Part</th>
                                            <th>Qty Per Assembly</th>
                                            <th>Required Qty</th>
                                            <th>Sub Assembly Qty</th>
                                            <th>Delta Qty</th>
                                            <th>Max Allocatable Sub Assy Qty</th>
                                            <th>Allocated Sub Assy Qty</th>
                                            <th>Delta2 Qty</th>
                                            <th>Raw Inventory</th>
                                            <th>Available Inventory</th>
                                            <th>Allocated</th>
                                            {/* <th>Get Allocation</th> */}
                                            <th>Order Qty</th>
                                            <th>Unit Price</th>
                                            <th>Total Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Rows.map((row, i) => (
                                            <tr>
                                                {/* <td>{row.part_uid}</td> */}
                                                <td>
                                                    {row.part.slice(0, row.part.lastIndexOf('-'))}
                                                </td>
                                                {/* <td>{row.part}</td> */}
                                                <td>
                                                    {row.part}
                                                </td>
                                                <td>{row.qty_per}</td>
                                                <td>{row.need_qty}</td>
                                                <td>{row.sub_qty}</td>
                                                <td>{row.delta_qty}</td>
                                                <td
                                                onClick={() => {
                                                    getAllocate(row.part);
                                                    setSelectedPartID(row.part);
                                                }}
                                                >
                                                {row.allocatable_qty}
                                                </td>
                                                <td>{row.allocated_qty}</td>
                                                <td>{row.delta2_qty}</td>
                                                <td>{row.inventory}</td>
                                                <td>{row.available_inv}</td>

                                                <td>
                                                <input
                                                    key={i}
                                                    type="number"
                                                    min="0"
                                                    name={row.part_uid}
                                                    max={row.inventory}
                                                    value={row.allocate_input}
                                                    onChange={(val) => {
                                                    changeRawInvAllocate(i, row.part_uid, val);
                                                    }}
                                                />
                                                </td>

                                                <td>{row.final_order_qty}</td>
                                                <td>{row.unit_price}</td>
                                                <td>{row.total_price}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Row>
                            <Row className="form-box">
                                <Col>
                                    <Button variant="secondary" size="lg"  onClick={handleSave2}>Save Inventory Allocation</Button>
                                </Col>
                                <Col>
                                    <Button variant="secondary" size="lg" onClick={buyParts} >Buy Parts</Button>
                                </Col>
                            </Row>
                        </div>
                        : <></> 
                    }
                </Row>
                <Row >
                    {orderSummary.length !== 0 ?
                        <div>
                            <h1 className="font30 form-item" >Order Summary</h1>
                            <Table striped bordered hover className="table">
                                <thead>
                                    <tr>
                                        <th>Part ID</th>
                                        <th>Order Qty</th>
                                        <th>Total Price</th>
                                    </tr>
                                    
                                </thead>
                                <tbody>
                                    {orderSummary.map((row) => {
                                        return(
                                            <tr>
                                                <td>{row.part_uid}</td>
                                                <td>{row.quantity}</td>
                                                <td>{row.total_price}</td>
                                            </tr>  
                                        )
                                        
                                    })}
                                </tbody>
                            </Table>
                        </div>
                        
                        : <></>
                    }
                </Row>
            </Container>
            <Modal
                show={show}
                onHide={handleClose}
                animation={false}
                dialogClassName="modalSize"
            >
                <Modal.Header closeButton>
                    <Modal.Title>{selectedPartID}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <tr>
                        <th style={{ width: "15%" }}>Invoice ID</th>
                        <th style={{ width: "5%" }}>Assembly</th>
                        <th style={{ width: "12%" }}>Date Available</th>
                        <th style={{ width: "10%" }}>Inventory Qty</th>
                        <th style={{ width: "10%" }}>Allocated Elsewhere</th>
                        <th style={{ width: "10%" }}>Allocatable</th>
                        <th style={{ width: "10%" }}>Allocate</th>
                        <th style={{ width: "10%" }}>Child</th>
                        <th style={{ width: "10%" }}>Qty Per Assembly</th>
                        <th style={{ width: "10%" }}>Allocated</th>
                        <th style={{ width: "10%" }}>Order Qty</th>
                    </tr>

                    {options.map((option, i) => (
                        <tr key={i}>
                        <td>{option.inv_uid}</td>
                        <td>{option.parent_pn}</td>
                        <td>{option.inv_available_date}</td>
                        <td>{option.inv_qty}</td>
                        <td>{option.previously_allocated}</td>
                        <td>{option.allocatable}</td>
                        <td>
                            {option.child_pn === selectedPartID.split("-")[0] ? (
                            <input
                                key={i}
                                type="number"
                                min="0"
                                name={option.inv_uid}
                                max={option.allocatable + option.allocate}
                                value={option.allocate}
                                onChange={(val) => {
                                changeAllocationQty(i, option.inv_uid, val);
                                }}
                            />
                            ) : (
                            ""
                            )}
                        </td>
                        <td>
                            {option.child_pn}-{option.child_lft}
                        </td>
                        <td>{option.RequiredQty}</td>
                        <td>{option.allocated}</td>
                        {console.log(
                            i,
                            "option.inv_uid,",
                            option.inv_uid,
                            "option.child_pn,",
                            " option.original_allocate,",
                            option.original_allocate,
                            " option.allocate,",
                            option.allocate,
                            " option.allocated,",
                            option.allocated,
                            "allocationQty,",
                            allocationQty,
                            "option.order,",
                            option.order,
                            "option.allocatable,",
                            option.allocatable,
                            "option.previously_allocated,",
                            option.previously_allocated,
                            "option.inv_qty,",
                            option.inv_qty
                        )}

                        {/* <td>{subtract(allocatedObj, allocated, option.child_pn)}</td> */}
                        {/* <td>
                            {Object.keys(allocatedObj).reduce((a, k) => {
                            a[k] = allocatedObj[k] - allocated[k];
                            return a;
                            }, {})}
                        </td> */}

                        <td>
                            {Object.keys(allocatedObj).includes(option.child_pn)
                            ? allocatedObj[option.child_pn] -
                                finalAllocated[option.child_pn]
                            : allocatedObj[option.child_pn] -
                                finalAllocated[option.child_pn]}
                        </td>
                        </tr>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ClearToBuild