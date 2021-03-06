import { Button, Form, Pagination, SelectPicker } from "rsuite";
import Link from "next/link";
import WithAuth from "../components/auth/withAuth";
import { useEffect, useState } from "react";
import { scriptServices } from "../services/scriptServices";
import LoadingScreen from "../components/UI/LoadingScreen/LoadingScreen";
import CreateScriptModal from "../components/pageComponents/Index/CreateScriptModal";
import { categoryServices } from "../services/categoryServices";

const Home = () => {
  const [list, setList] = useState([]);
  const [listCopy, setListCopy] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showAddScript, setShowAddScript] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPaginatio] = useState({
    currentPage: 1,
    sizePerPage: 6,
  });

  useEffect(() => {
    setIsLoading(true);
    categoryServices.getListOfCategories().then(res => {
      setCategories(res.data.data);
    });

    console.log(pagination);
    scriptServices.getListOfScripts().then(res => {
      console.log(res.data.data);
      setList(res.data.data);
      setListCopy(res.data.data);
      setIsLoading(false);
    });
  }, []);

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
          {/* <button
            onClick={() => setShowAddScript(true)}
            className="button"
            style={{ width: "300px", margin: "2rem auto", display: "block" }}>
            Dodaj skriptu
          </button> */}
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
                  {/* <div
                    style={{
                      marginLeft: "2rem",
                      color: "red",
                      cursor: "pointer",
                    }}>
                    DELETE
                  </div> */}
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
      <CreateScriptModal
        show={showAddScript}
        categories={categories}
        onClose={() => {
          setShowAddScript(false);
        }}
      />
    </div>
  );
};

export default WithAuth(Home);
