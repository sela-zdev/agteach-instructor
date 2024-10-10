import {
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useRef, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomTable from "../components/CustomTable";
import QueryHeader from "../components/QueryHeader";
import {
  useConfirmDeleteMutation,
  useGetAllProductsQuery,
} from "../services/api/productApi";
import { useNavigate } from "react-router";
import deletBin from "../assets/Go Green Grey Hanger Bag.png";
import emptyProduct from "../assets/Spooky Stickers Sweet Franky.png";

function ProductPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectState, setSelectState] = useState();
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const {
    data: products,
    isLoading: isSearching,
    refetch,
  } = useGetAllProductsQuery({ name: searchTerm, order: selectState });
  const [confirmDelete] = useConfirmDeleteMutation();
  const searchRef = useRef();
  const label = "Sort";
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedProduct) {
      try {
        await confirmDelete(selectedProduct.productId).unwrap();
        refetch();
      } catch (error) {
        console.error("Failed to delete the product: ", error);
      }
    }
    handleCloseDialog();
  };

  const productList =
    isSearching || !products
      ? []
      : products?.item?.map((item) => ({
          Name: item.name,
          Category: item.categoryId,
          Quantity: item.quantity,
          Price: item.price,
          edit: (
            <EditIcon
              sx={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/product/new", {
                  state: {
                    product: item,
                  },
                });
              }}
            />
          ),
          delete: (
            <DeleteIcon
              color="red"
              sx={{ cursor: "pointer" }}
              onClick={() => handleDeleteClick(item)}
            />
          ),
        })) || [];

  const handleSearch = () => {
    setIsLoadingSearch(true);
    const term = searchRef.current.value;
    setSearchTerm(term); // Update the search term state
    setIsLoadingSearch(false);
  };

  return (
    <Stack gap="30px" sx={{ width: "100%" }}>
      <QueryHeader
        label={label}
        searchRef={searchRef}
        useSelectState={[selectState, setSelectState]}
        isCreateNew={true}
        selectData={["Newest", "Oldest"]}
        handleSearch={handleSearch}
        pathCreated="/product/new"
        labelCreate="Create Product"
      />
      {isSearching || isLoadingSearch ? (
        <Typography>Loading products...</Typography>
      ) : productList.length === 0 ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height={"60vh"}
          sx={{ textAlign: "center" }}
        >
          <img
            src={emptyProduct}
            alt="emptyProduct"
            style={{ width: "200px", height: "200px", marginBottom: "10px" }}
          />
          <Typography variant="bmdr">No products found</Typography>
        </Box>
      ) : (
        <CustomTable data={productList} rowLimit={10} isPagination={true} />
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogContent>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{ textAlign: "center" }}
          >
            <img
              src={deletBin}
              alt="Confirmation"
              style={{ width: "136px", height: "136px", marginBottom: "10px" }}
            />
            <Typography variant="blgsm" padding={"10px"}>
              Delete Confirmation
            </Typography>
            <Typography variant="bxsr">
              Are you sure you want to delete this product? <br /> You won't be
              able to retrieve it back.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", mb: "16px" }}>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            sx={{ bgcolor: "red.main", marginRight: 1 }}
          >
            Delete
          </Button>
          <Button
            onClick={handleCloseDialog}
            color="primary"
            variant="outlined"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}

export default ProductPage;
