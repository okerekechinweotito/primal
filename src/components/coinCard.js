import {
  Box,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
} from "@chakra-ui/react";

export default function CoinCard({ image, name, price }) {
  return (
    <Box
      width="200px"
      height={"auto"}
      maxHeight="220px"
      bg={useColorModeValue("white", "gray.800")}
      boxShadow="2xl"
      zIndex={1}
      padding="0.5em"
      background={"#112240"}
      cursor={"pointer"}
      transition="0.3s"
      box-shadow=" 0px 10px 10px 10px rgba(1, 41, 112, 0.08)"
      _hover={{
        transform: "scale(0.9)",
      }}
    >
      <Image height="50%" width={282} objectFit={"contain"} src={image} />

      <Stack pt={10} align={"center"}>
        <Heading
          fontSize={"xl"}
          fontFamily={"body"}
          fontWeight={500}
          color="#FF5C00"
        >
          {name}
        </Heading>
        <Stack direction={"row"} align={"center"}>
          <Text color={"#CCD6F6"}>${price}</Text>
        </Stack>
      </Stack>
    </Box>
  );
}
