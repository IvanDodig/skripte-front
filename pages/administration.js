import { useEffect, useState } from "react";
import { Button, Panel } from "rsuite";
import WithAuth from "../components/auth/withAuth";
import CreateCategoryModal from "../components/pageComponents/Administration/CreateCategoryModal";
import ConfirmModal from "../components/UI/ConfirmModal/ConfirmModal";
import LoadingScreen from "../components/UI/LoadingScreen/LoadingScreen";
import { categoryServices } from "../services/categoryServices";
import TrashIcon from "@rsuite/icons/Trash";
import EditIcon from "@rsuite/icons/Edit";
import EditCategoryModal from "../components/pageComponents/Administration/EditCategoryModal";

const Administration = () => {
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [showNewCategoryModal, setShowNewCategoryModal] = useState(false);
  const [editCategoryData, setEditCategoryData] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  useEffect(async () => {
    setCategoriesLoading(true);
    const categoriesResponse = await categoryServices.getListOfCategories();
    console.log(categoriesResponse);
    setCategories(categoriesResponse?.data?.data);
    setCategoriesLoading(false);
  }, [update]);
  return (
    <Panel
      bordered
      id="all-scripts"
      style={{
        background: "white",
        // width: "800px",
        minHeight: "80vh",
        textAlign: "center",
      }}>
      <h3>Administracija</h3>
      <br></br>
      <br></br>
      <br></br>
      <h4>Kategorije</h4>
      <br></br>
      <Button
        style={{ background: "black", fontSize: "1rem" }}
        appearance="primary"
        onClick={() => setShowNewCategoryModal(true)}>
        Dodaj novu kategoriju
      </Button>
      <br></br>
      <br></br>
      {categoriesLoading ? (
        <div style={{ width: "100%", textAlign: "center", margin: "10rem 0" }}>
          <LoadingScreen />
        </div>
      ) : (
        categories.map(x => (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "2rem",
            }}>
            <div style={{ marginTop: "1rem" }}>
              <b>{x.name}</b>
              <p>{new Date(x.created_at).toLocaleDateString("hr-HR")}</p>
              <br></br>
            </div>
            <Button
              color="green"
              appearance="primary"
              onClick={() => {
                setEditCategoryData(x);
              }}>
              <EditIcon />
            </Button>
            <Button
              color="red"
              appearance="primary"
              onClick={() => {
                setDeleteCategoryId(x.id);
                setShowConfirmDelete(true);
              }}>
              <TrashIcon />
            </Button>
          </div>
        ))
      )}
      <ConfirmModal
        show={showConfirmDelete}
        onClose={() => {
          setDeleteCategoryId(null);
          setShowConfirmDelete(false);
        }}
        onConfirm={async () => {
          setDeleteLoading(true);
          await categoryServices.deleteCategory(deleteCategoryId);
          setDeleteLoading(false);
          setUpdate(!update);
          setDeleteCategoryId(null);
          setShowConfirmDelete(false);
        }}
        loading={deleteLoading}
      />
      <CreateCategoryModal
        show={showNewCategoryModal}
        onClose={() => {
          setShowNewCategoryModal(false);
        }}
        setUpdate={setUpdate}
      />
      {editCategoryData && (
        <EditCategoryModal
          show={editCategoryData}
          onClose={() => {
            setEditCategoryData(false);
          }}
          data={editCategoryData}
          setUpdate={setUpdate}
        />
      )}
    </Panel>
  );
};

export default WithAuth(Administration);
