import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Grid, Box, Button, Image, Spinner, Flex } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import url from './vars';

const Container = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const sentinelRef = useRef(null);
  const { title } = useParams(); // Get the title from URL params

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${url}/recipes/?page=${currentPage}&limit=${itemsPerPage}`);
        // Filter the data based on the title if it exists
        const filteredData = title ? response.data.filter(item => item.title.toLowerCase().includes(title.toLowerCase())) : response.data;
        setData((prevData) => [...prevData, ...filteredData]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, itemsPerPage, title]); // Include title in dependency array

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    }, options);

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [loading]);

  const handleDetailClick = (id) => {
    navigate(`/recipe-data/${id}`);
  };

  return (
    <Flex justifyContent="center">
      <Flex flexDirection="column" width={{ base: '100%', md: '90%', lg: '80%' }}>
        <Box p={5}>
          <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={4}>
            {data.map((item, index) => (
              <Box key={index} borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="md">
                <Image src={item.image} alt={item.title} />
                <Box p="6">
                  <Box d="flex" alignItems="baseline">
                    <Box fontWeight="semibold" fontSize="lg" mr={2}>
                      {item.title}
                    </Box>
                    <Box color="gray.500" fontWeight="semibold" fontSize="sm">
                      Cook Time: {item.cookTime}
                    </Box>
                  </Box>
                  <Button onClick={() => handleDetailClick(item._id)} mt={2} colorScheme="teal">
                    Details
                  </Button>
                </Box>
              </Box>
            ))}
            <div ref={sentinelRef} style={{ visibility: 'hidden', height: 1 }}></div>
          </Grid>
          {loading && (
            <Flex justifyContent="center" alignItems="center" marginTop="20px">
              <Spinner color="teal" size="xl" thickness="4px" />
            </Flex>
          )}
        </Box>
      </Flex>
    </Flex>
  );
};

export default Container;
