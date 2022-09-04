import { Button, Form, Pagination, SelectPicker } from "rsuite";
import Link from "next/link";
import WithAuth from "../components/auth/withAuth";
import { useContext, useEffect, useState } from "react";
import LoadingScreen from "../components/UI/LoadingScreen/LoadingScreen";
import CreateScriptModal from "../components/pageComponents/Index/CreateScriptModal";
import { categoryServices } from "../services/categoryServices";
import { userScriptsServices } from "../services/userScriptsServices";
import { AuthContext } from "../contexts/AuthContext";
import ConfirmModal from "../components/UI/ConfirmModal/ConfirmModal";
import { scriptServices } from "../services/scriptServices";
import TrashIcon from "@rsuite/icons/Trash";
import EditIcon from "@rsuite/icons/Edit";
import UpdateScriptModal from "../components/pageComponents/Index/UpdateScriptModal";

const MyScripts = () => {
  const { loginUser } = useContext(AuthContext);

  const [list, setList] = useState([]);
  const [listCopy, setListCopy] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showAddScript, setShowAddScript] = useState(false);
  const [showUpdateScript, setShowUpdateScript] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPaginatio] = useState({
    currentPage: 1,
    sizePerPage: 6,
  });
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteScriptId, setDeleteScriptId] = useState(null);

  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    categoryServices.getListOfCategories().then(res => {
      setCategories(res.data.data);
    });
    userScriptsServices.getListOfScripts(loginUser?.id).then(res => {
      setList(res.data.data);
      setListCopy(res.data.data);
      setIsLoading(false);
    });
  }, [update]);

  const handleSearch = () => {
    let filteredScripts = listCopy;
    if (formValues.scriptName) {
      filteredScripts = filteredScripts.filter(x => {
        const first = x.title.toLowerCase();
        const second = formValues.scriptName.toLowerCase();
        return first.includes(second);
      });
    }
    if (formValues.categoryId) {
      filteredScripts = filteredScripts.filter(x => {
        return x.category_id == formValues.categoryId;
      });
    }

    setList(filteredScripts);
  };

  return (
    <div id="all-scripts">
      <h3 style={{ textAlign: "center", marginBottom: "2rem" }}>
        Moje skripte: {loginUser.name}
      </h3>
      <Form className="filters" onChange={values => setFormValues(values)}>
        <Form.Group controlId="name">
          <Form.ControlLabel>Naziv skripte</Form.ControlLabel>
          <Form.Control name="scriptName" />
        </Form.Group>
        <Form.Group controlId="categoryId">
          <Form.ControlLabel>Kategorija </Form.ControlLabel>
          <Form.Control
            name="categoryId"
            accepter={SelectPicker}
            data={categories.map(x => {
              return {
                label: x.name,
                value: x.id,
                role: x.id,
              };
            })}
          />
        </Form.Group>

        <Button type="submit" className="button" onClick={handleSearch}>
          Search
        </Button>
      </Form>
      {isLoading ? (
        <div style={{ width: "100%", textAlign: "center", margin: "10rem 0" }}>
          <LoadingScreen />
        </div>
      ) : (
        <>
          <hr></hr>
          <button
            onClick={() => setShowAddScript(true)}
            className="button"
            style={{
              width: "200px",
              margin: "2rem auto 0 auto ",
              padding: "0.5rem 0",
              display: "block",
            }}>
            Dodaj skriptu
          </button>
          <div className="scripts-list">
            {list
              .slice(
                (pagination.currentPage - 1) * pagination.sizePerPage,
                pagination.currentPage * pagination.sizePerPage,
              )
              .map((script, index) => (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    // justifyContent: "space-between",
                  }}>
                  <Link href={"/" + script.id} key={index}>
                    <div className="script">
                      <div className="image"></div>
                      <div className="content">
                        <h4 className="title">{script.title}</h4>
                        <div className="author-date">
                          {script.creator.name} |{" "}
                          {new Date(script.created_at).toLocaleDateString(
                            "hr-HR",
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                  <Button
                    color="green"
                    appearance="primary"
                    style={{
                      marginLeft: "2rem",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setShowUpdateScript(script);
                    }}>
                    <EditIcon />
                  </Button>
                  <Button
                    color="red"
                    appearance="primary"
                    style={{
                      marginLeft: "1rem",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setDeleteScriptId(script.id);
                      setShowConfirmDelete(true);
                    }}>
                    <TrashIcon />
                  </Button>
                </div>
              ))}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "1rem 0",
            }}>
            <Pagination
              total={list.length}
              limit={pagination.sizePerPage}
              activePage={pagination.currentPage}
              size="lg"
              onChangePage={page => {
                setPaginatio({ ...pagination, currentPage: page });
              }}
            />
          </div>
        </>
      )}
      <ConfirmModal
        show={showConfirmDelete}
        loading={deleteLoading}
        onClose={() => {
          setDeleteScriptId(null);
          setShowConfirmDelete(false);
        }}
        onConfirm={async () => {
          setDeleteLoading(true);
          await scriptServices.deleteScript(deleteScriptId);
          setUpdate(!update);
          setDeleteScriptId(null);
          setShowConfirmDelete(false);
          setDeleteLoading(false);
        }}
      />
      <CreateScriptModal
        show={showAddScript}
        categories={categories}
        onClose={() => {
          setShowAddScript(false);
          setUpdate(!update);
        }}
      />
      {showUpdateScript && (
        <UpdateScriptModal
          show={showUpdateScript}
          data={showUpdateScript}
          categories={categories}
          onClose={() => {
            setShowUpdateScript(false);
            setUpdate(!update);
          }}
        />
      )}
    </div>
  );
};

export default WithAuth(MyScripts);
