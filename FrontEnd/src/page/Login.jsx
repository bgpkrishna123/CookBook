import { useState } from 'react';
import { Flex, Box, Button, Image, Input, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom'; 
import { FaArrowLeft } from 'react-icons/fa'; 
import '../Styles/LoginPage.css'; 
import Heading from '../Components/Heading';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    if (isLogin) {
      // Handle login
    } else {
      // Handle signup
    }
  };

  const togglePage = () => {
    setIsLogin(!isLogin);
  };

  return (
    <>
     <Link to="/" className="backButton">
            <FaArrowLeft /> 
          </Link>
          <Heading/>
    <Flex align="center" justify="center" h="100vh" mt="-10">
      <Box maxW="lg"  borderWidth="1px" borderRadius="lg" boxShadow="lg" className={isLogin ? 'loginBox' : 'signupBox'}>
        <Flex direction="column" align="center" p={8}>
          <Image src="https://www.popsci.com/uploads/2023/01/23/use-apps-to-organize-cooking-recipes.jpg?auto=webp&optimize=high&width=1440" alt="Image" />
          <form onSubmit={handleSubmit}>
            <Box mt={6}>
            <h1 style={{ fontSize: '2rem', color: 'teal', fontWeight: 'bold' , marginBottom: '10px', textAlign: 'center' }}>{isLogin ? 'Log In' : 'Sign Up'} </h1>

              {!isLogin && ( 
                <Input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={handleNameChange}
                  mb={4}
                />
              )}
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                mb={4}
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                mb={4}
              />
              {!isLogin && ( 
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  mb={4}
                />
              )}
              <Flex justifyContent="center">
                <Button type="submit" colorScheme="teal" mr={2}>
                  {isLogin ? 'Log In' : 'Sign Up'}
                </Button>
              </Flex>
              <Text color="gray.500" mt={2} textAlign="center">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <Text as="span" color="teal" cursor="pointer" onClick={togglePage}>
                  {isLogin ? 'Sign Up' : 'Log In'}
                </Text>
              </Text>
            </Box>
          </form>
        </Flex>
      </Box>
    </Flex>
    </>
  );
};

export default LoginPage;
