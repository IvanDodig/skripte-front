import { useContext, useEffect, useState } from "react";
import { Button, Panel, Rate } from "rsuite";
import WithAuth from "../components/auth/withAuth";
import AddReviewModal from "../components/pageComponents/ScriptId/AddReviewModal";
import LoadingScreen from "../components/UI/LoadingScreen/LoadingScreen";
import { filesServices } from "../services/filesServices";
import { scriptReviewServices } from "../services/scriptReviewsServices";
import { scriptServices } from "../services/scriptServices";
import { userScriptsServices } from "../services/userScriptsServices";

const SingleScriptPage = ({ scriptId, script }) => {
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviewsData, setReviewsData] = useState([]);
  const [updateReviews, setUpdateReviews] = useState(false);
  const [addReviewModal, setAddReviewModal] = useState(false);

  useEffect(async () => {
    setReviewsLoading(true);
    const scriptReviewResponse =
      await scriptReviewServices.getListOfScriptReviews(scriptId);
    console.log(scriptReviewResponse);
    setReviewsData(scriptReviewResponse?.data?.data || []);
    setReviewsLoading(false);
  }, [updateReviews]);

  const downloadScript = async () => {
    const res = await filesServices.downloadFile(scriptId);
    console.log("blob", res);
    const blob = new Blob([res.data], { type: res.headers["content-type"] });
    console.log(blob);
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  };
  return (
    <Panel
      bordered
      style={{
        background: "white",
        width: "800px",
        margin: "2rem",
        minHeight: "80vh",
        textAlign: "center",
      }}>
      <h3>{script?.title}</h3>
      <br></br>
      <br></br>
      <div>{script?.creator?.name}</div>
      <div>{new Date(script?.created_at).toLocaleDateString("hr-HR")}</div>
      <br></br>
      <br></br>
      <br></br>
      <h6>Opis:</h6>
      <br></br>
      <div>{script?.description}</div>
      <br></br>
      <br></br>
      <h6>Kategorija:</h6>
      <br></br>
      <div>{script?.category?.name}</div>
      <br></br>
      <br></br>
      <h6 style={{ cursor: "pointer" }} onClick={downloadScript}>
        Preuzmi skriptu
      </h6>

      <div style={{ margin: "4rem 0" }}>
        <h4> Ocjene</h4>
        <Button onClick={() => setAddReviewModal(true)}>Ocijeni skriptu</Button>
        {reviewsLoading ? (
          <div
            style={{ width: "100%", textAlign: "center", margin: "10rem 0" }}>
            <LoadingScreen />
          </div>
        ) : (
          reviewsData
            .slice(0)
            .reverse()
            .map(x => (
              <div
                style={{
                  width: "100%",
                  background: "#eee",
                  minHeight: "40px",
                  margin: "1rem 0",
                  textAlign: "left",
                  padding: "1rem",
                }}>
                <h6>{x?.reviewer?.name}</h6>
                <div>{x?.updated_at}</div>

                <Rate readOnly defaultValue={x?.rating} />
                <p>{x?.description}</p>
              </div>
            ))
        )}
      </div>

      <AddReviewModal
        show={addReviewModal}
        scriptId={scriptId}
        onClose={() => {
          setAddReviewModal(false);
          setUpdateReviews(!updateReviews);
        }}
      />
    </Panel>
  );
};

export default WithAuth(SingleScriptPage);

export async function getServerSideProps(ctx) {
  const scriptId = ctx.params.scriptId;
  const scriptResponse = await scriptServices.getScriptById(scriptId);

  return {
    props: {
      scriptId,
      script: scriptResponse?.data?.data || null,
    },
  };
}
