import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  RadioGroup,
  Stack,
  Radio,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

function EditRecipieModal({ isOpen, onOpen, onClose, item }) {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [data, setData] = useState(item);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader>Edit The Reipie</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="Title"
                  name="title"
                  value={data.title}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Category</FormLabel>
                <RadioGroup
                  onChange={(value) =>
                    setData((prev) => ({ ...prev, category: value }))
                  }
                  value={data.category}
                  name="category"
                >
                  <Stack direction="row">
                    <Radio value="Vegetarian">Vegetarian</Radio>
                    <Radio value="Non-Vegetarian">Non-Vegetarian</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  placeholder="Description"
                  name="description"
                  value={data.description}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Image</FormLabel>
                <Input
                  placeholder="Image"
                  name="image"
                  value={data.image}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Ingredients</FormLabel>
                <Textarea
                  placeholder="Ingredients"
                  name="ingredients"
                  value={data.ingredients}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Instructions</FormLabel>
                <Textarea
                  placeholder="Instructions"
                  name="instructions"
                  value={data.instructions}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Dietary Restrictions</FormLabel>
                <Textarea
                  placeholder="Dietary Restrictions"
                  name="dietaryRestrictions"
                  value={data.dietaryRestrictions}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Healthiness</FormLabel>
                <Input
                  placeholder="Healthiness"
                  name="healthiness"
                  value={data.healthiness}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Cook Time</FormLabel>
                <Input
                  placeholder="Cook Time"
                  name="cookTime"
                  value={data.cookTime}
                  onChange={handleChange}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                Update
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditRecipieModal;