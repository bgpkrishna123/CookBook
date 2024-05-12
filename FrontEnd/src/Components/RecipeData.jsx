// RecipeData.js

import { Box, Heading, Image, ListItem, Spinner, Text, UnorderedList } from "@chakra-ui/react";
import axios from 'axios';
import { motion } from "framer-motion";
import { useEffect, useState } from 'react';
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useParams } from "react-router-dom";
import "../Styles/RecepeData.css";

const RecipeData = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  useEffect(() => {
    axios.get(`http://localhost:7700/recipes/${id}`)
      .then(response => {
        setLoading(false);
        if (Array.isArray(response.data)) {
          setRecipes(response.data);
        } else {
          setRecipes([response.data]);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [id]); 

  return (
    <>
      <Navbar/>
      <Box
        backgroundImage="url('https://images.pexels.com/photos/4397925/pexels-photo-4397925.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" 
        backgroundSize="cover"
        backgroundPosition="center"
        minHeight="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        p={4}
      >
        <Heading as="h1" fontFamily="sans-serif" textAlign="center" mb={5} color="teal" mt={5}>Recipe Details</Heading>

        {loading ? (
          <Box textAlign="center">
            <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="teal.500" size="xl" />
          </Box>
        ) : (
          recipes.map(recipe => (
            <motion.div 
              key={recipe._id}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="recipe-container"
            >
              <Box
                p={5}
                className="recipe-box"
              >
                <Box width="40%" className="image-box">
                  <Image 
                    src="https://images.pexels.com/photos/6287300/pexels-photo-6287300.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt={recipe.title}
                    maxH={400}
                    width={"100%"}
                    borderRadius="lg"
                    boxShadow="md"
                    mb={4}
                    className="image"
                  />
                </Box>
                <Box width="50%" boxShadow="lg" m={4} className="details-box">
                  <Box p={4}>
                    <Heading as="h2" size="lg" className="title">{recipe.title}</Heading>
                    <Text mt={2} fontWeight="bold" color="gray.600" className="description">{recipe.description}</Text>
                    <Box>
                      <Text mt={2} fontWeight="bold" color="gray.600" className="dietary">Dietary Restrictions: {recipe.dietaryRestrictions.join(', ')}</Text>
                      <Text mt={2} fontWeight="bold" color="gray.600" className="healthiness">Healthiness: {recipe.healthiness}</Text>
                      <Text mt={2} fontWeight="bold" color="gray.600" className="created-by">Created By: {recipe.createdBy}</Text>
                      <Text mt={2} fontWeight="bold" color="gray.600" className="created-at">Created At: {new Date(recipe.createdAt).toLocaleDateString()}</Text>
                      <Text mt={2} fontWeight="bold" color="gray.600" className="cook-time">Cook Time: {recipe.cookTime}</Text>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box
                className="instruction-ingredient-box"
              >
                <Box width="40%" m={4} className="instruction-box">
                  <Box p={4} className="instruction-inner">
                    <Text fontWeight="bold" color="gray.600" mb={2} className="instruction-header">Instructions</Text>
                    <UnorderedList className="instruction-list">
                      {recipe.instructions.map((instruction, index) => (
                        <ListItem 
                          key={index} 
                          color="gray.600" 
                          _hover={{ color: "teal", fontWeight: "bold" }} 
                          className="instruction-item"
                        >
                          {instruction}
                        </ListItem>
                      ))}
                    </UnorderedList>
                  </Box>
                </Box>
                
                <Box width="40%" m={4} className="ingredient-box">
                  <Box p={4} className="ingredient-inner">
                    <Text fontWeight="bold" color="gray.600" mb={2} className="ingredient-header">Ingredients</Text>
                    <UnorderedList className="ingredient-list">
                      {recipe.ingredients.map((ingredient, index) => (
                        <ListItem 
                          key={index} 
                          color="gray.600" 
                          _hover={{ color: "teal", fontWeight: "bold" }}
                          className="ingredient-item"
                        >
                          {ingredient}
                        </ListItem>
                      ))}
                    </UnorderedList>
                  </Box>
                </Box>
              </Box>
            </motion.div>
          ))
        )}
      </Box>
      <Footer/>
    </>
  );
}

export default RecipeData;
