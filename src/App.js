import { useState } from "react";
import { useQuery } from "react-query";
import { fetchCoins } from "./api/fetchCoins";
import { v4 as coinID } from "uuid";
import CoinCard from "./components/coinCard";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Center,
  Flex,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";

function App() {
  const [page, setPage] = useState(1);
  const [pageEnd, setPageEnd] = useState(false);
  const [pageStart, setPageStart] = useState(true);
  const pageNumbers = [];
  for (let i = 1; i <= 5; i++) {
    pageNumbers.push(i);
  }

  const { isLoading, isError, error, data, isFetching } = useQuery({
    queryKey: ["users", page],
    queryFn: () => fetchCoins(page),
    keepPreviousData: true,
  });

  const handleNext = () => {
    if (page !== 4) {
      setPage((old) => old + 1);
      setPageStart(false);
    } else {
      setPage((old) => old + 1);
      setPageEnd(true);
    }
  };

  const handlePrev = () => {
    console.log(page);
    if (page !== 2) {
      setPage((old) => old - 1);
      setPageEnd(false);
    } else {
      setPage((old) => old - 1);
      setPageStart(true);
    }
  };

  return (
    <VStack>
      {isLoading || isFetching ? (
        <Center height={"100vh"}>
          <Spinner
            size="xl"
            width={"10em"}
            height={"10em"}
            thickness="20px"
            speed="0.65s"
            emptyColor="#fff"
            color="#FF5C00"
          />
        </Center>
      ) : isError ? (
        <Center height={"100vh"}>
          <Alert
            status="error"
            variant="solid"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
            background={"#aa480f"}
            padding="1em"
            color="#CCD6F6"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              {error.message}
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              API Rate Limit may have been exceeded. Retry after 60seconds
            </AlertDescription>
            <AlertDescription maxWidth="sm">
              Please Check Your Network and Try Again
            </AlertDescription>
          </Alert>
        </Center>
      ) : (
        <>
          <Flex
            flexFlow={"row wrap"}
            gap="2em"
            justifyContent={"space-around"}
            mt="3em"
            paddingY="1em"
            paddingX="10em"
          >
            {data.map((coin) => (
              <CoinCard
                key={coinID()}
                image={coin.image}
                name={coin.id}
                price={coin.current_price}
              />
            ))}
          </Flex>{" "}
          <Flex justifyContent="center" gap="0.5em" paddingTop={"2em"}>
            <Button onClick={handlePrev} isDisabled={pageStart}>
              Previous Page
            </Button>
            {pageNumbers.map((number) => (
              <Button
                key={number}
                colorScheme={page === number ? "red" : "gray"}
                mr={2}
                onClick={() => {
                  setPage(number);
                  number === 5 ? setPageEnd(true) : setPageEnd(false);
                  number === 1 ? setPageStart(true) : setPageStart(false);
                }}
              >
                <Text fontSize="sm">{number}</Text>
              </Button>
            ))}
            <Button onClick={handleNext} isDisabled={pageEnd}>
              Next Page
            </Button>
          </Flex>
        </>
      )}
    </VStack>
  );
}

export default App;
