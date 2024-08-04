'use client'

import {Box, Button, Modal, Stack, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {collection, deleteDoc, doc, getDoc, getDocs, query, setDoc} from "firebase/firestore";
import {firestore} from "@/firebase";
import PantryItem from "@/components/PantryItem";

export default function Home() {
    const [pantry, setPantry] = useState([]);
    const [filteredPantry, setFilteredPantry] = useState([]);
    const [open, setOpen] = useState(false);
    const [itemName, setItemName] = useState("");

    useEffect(() => {
        updatePantry()
    }, []);


    const updatePantry = async () => {
        const snapshot = query(collection(firestore, 'pantry'))
        const docs = await getDocs(snapshot);

        const pantryList = [];
        docs.forEach((doc) => {
            pantryList.push({
                name: doc.id,
                ...doc.data()
            })
        })

        setPantry(pantryList);
    }


    const addItem = async (item) => {
        const docRef = doc(collection(firestore, 'pantry'), item);
        const docSnap = await getDoc(docRef)

        if(docSnap.exists()){
            const {quantity} = docSnap.data();
            await setDoc(docRef, {quantity: quantity + 1});
        }
        else{
            await setDoc(docRef, {quantity: 1});
        }

        await updatePantry();
    }

    const removeItem = async (item) => {
        const docRef = doc(collection(firestore, 'pantry'), item);
        const docSnap = await getDoc(docRef)

        if(docSnap.exists()){
            const {quantity} = docSnap.data();
            if(quantity === 1) {
                await deleteDoc(docRef);
            }
            else {
                await setDoc(docRef, {quantity: quantity - 1});
            }
        }

        await updatePantry();
    }

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSearch = (e) => {
        const query = e.target.value.trim().toLowerCase();
        if (query === '') {
            setFilteredPantry([]);
        } else {
            const modifiedPantry = pantry.filter((item) => item.name.toLowerCase().includes(query));
            setFilteredPantry(modifiedPantry);
        }
    }

    const itemsToDisplay = filteredPantry.length > 0 ? filteredPantry : pantry;

    return (
    <Box
        width="100vw"
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        gap={3}
    >
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box
                position="absolute"
                top="50%"
                left="50%"
                width={400}
                bgcolor="white"
                border="2px solid #000"
                boxShadow={24}
                p={4}
                display="flex"
                flexDirection="column"
                gap={3}
                sx={{
                    transform: "translate(-50%, -50%)"
                }}
            >
                <Typography variant="h6">Add Item</Typography>
                <Stack width="100%" direction="row" spacing={2}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                    >
                    </TextField>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            addItem(itemName)
                            setItemName('')
                            handleClose()
                        }}
                    >Add</Button>
                </Stack>
            </Box>
        </Modal>


        <Box border="1px solid #333">
            <Box
                width="800px"
                height="100px"
                bgcolor="#ADD8E6"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography variant="h2" color="#333">Pantry Items</Typography>
            </Box>
        </Box>

        <Stack width="800px" direction="row" spacing={2}>
            <TextField
                variant="outlined"
                fullWidth
                onChange={handleSearch}
            >
            </TextField>
            <Button
                variant="contained"
                onClick={() => handleOpen()}
            >Add New Item</Button>
        </Stack>


        <Stack
            width="800px"
            height="300px"
            spacing={2}
            overflow="auto"
        >
            {itemsToDisplay.map(({ name, quantity }) => (
                <PantryItem
                    key={name}
                    name={name}
                    quantity={quantity}
                    addItem={addItem}
                    removeItem={removeItem}
                />
            ))}
        </Stack>
    </Box>
  );
}
