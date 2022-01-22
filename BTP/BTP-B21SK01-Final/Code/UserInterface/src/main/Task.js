import LinearProgress from "@material-ui/core/LinearProgress";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

function Task({ tasks, eror, isLoading }) {
  return (
    <div>
      {isLoading ? (
        <LinearProgress />
      ) : eror ? (
        <div style={{ marginTop: "25vh" }}>
          {" "}
          <center>
            <img
              style={{ width: "200px", height: "200px" }}
              alt=""
              src="/network.svg"
            />

            <Typography variant="h5" style={{ color: "#495057" }}>
              Network Error
            </Typography>
          </center>
        </div>
      ) : (
        <div style={{ marginBottom: "80px" }}>
          {tasks.length === 0 ? (
            <div style={{ marginTop: "25vh" }}>
              {" "}
              <center>
                <img
                  style={{ width: "200px", height: "200px" }}
                  alt=""
                  src="/task.svg"
                />

                <Typography variant="h5" style={{ color: "#495057" }}>
                  No Pending task
                </Typography>
              </center>
            </div>
          ) : (
            <div>
              {tasks.map((element) => (
                <div
                  key={element._id}
                  style={{ padding: "18px 16px 0px 16px" }}
                >
                  <Card variant="outlined" style={{ borderRadius: "18px" }}>
                    <Grid container spacing={0} style={{ height: "150px" }}>
                      <Grid item xs={4}>
                        <img
                          src={element.image_url}
                          draggable={false}
                          width="100%"
                          height="150px"
                          alt=""
                          style={{
                            objectFit: "fill",
                            borderTopRightRadius: "18px",
                            borderBottomRightRadius: "18px",
                          }}
                        />
                      </Grid>
                      <Grid item xs={8}>
                        <div
                          style={{
                            padding: "0px 8px 0px 8px",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <center>
                            <Typography
                              variant="body1"
                              style={{
                                color: "#495057",
                                fontSize: "19px",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {element.title}
                            </Typography>

                            <Typography
                              variant="body2"
                              style={{ color: "#6c757d" }}
                            >
                              <em>{element.description}</em>
                            </Typography>

                            <Typography
                              variant="caption"
                              style={{ color: "#6c757d" }}
                            >
                              {new Date(element.date).toDateString()} -{" "}
                              {new Date(element.date).toLocaleTimeString()}
                            </Typography>
                          </center>
                        </div>
                      </Grid>
                    </Grid>
                  </Card>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Task;
