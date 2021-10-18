import React, { useReducer, useRef, useCallback } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/Stack";
import Stat, { StatMemo } from "./Stat";
import RenderColor from "../../component/RenderColor";

//Reduce Farm
const initialStateFarm = {
  little: 0,
  adult: 0,
  total: 0,
  sale: 0,
};
function reducerFarm(state, action) {
  let ref = { ...state },
    val = 0;
  const { little, adult, sale } = action.data;
  switch (action.type) {
    case "little":
      //sumar pollitos
      val = parseInt(little);
      if (val > 0) {
        ref.little = state.little + val;
        //update total
        ref.total = ref.little;
      }

      break;

    case "adult":
      val = parseInt(adult);
      if (val > 0 && ref.little >= val) {
        //aumentar pollos adultos
        ref.adult = state.adult + val;
        //disminuir pollitos
        if (ref.little >= val) {
          ref.little = state.little - val;
        }
      }
      break;

    case "sale":
      val = parseInt(sale);
      if (val > 0) {
        if (ref.total > 0 && val > 0 && ref.adult >= val) {
          //disminuir total de pollos adultos
          ref.adult = ref.adult - val;
          //update total
          ref.total = ref.total - val;
          // aumentar conteo de pollos vendidos
          ref.sale = val + state.sale;
        }
      }
      break;

    case "total":
      ref.total = ref.little + ref.adult;
      break;

    default:
      break;
  }
  return ref;
}
//Reduce Form
const initialStateForm = {
  little: 0,
  adult: 0,
  sale: 0,
};
function reducerForm(state, action) {
  switch (action.type) {
    case "data":
      const { name, value } = action.field;
      return { ...state, [name]: value };

      break;
    case "reset":
      return initialStateFarm;

    default:
      break;
  }
  return state;
}
const Farm = () => {
  //define hook reduce Farm
  const [state, dispatch] = useReducer(reducerFarm, initialStateFarm);
  //define hook Reduce Form
  const [form, dispatchForm] = useReducer(reducerForm, initialStateForm);
  const { little, adult, sale } = form;
  const onChangeInput = ({ target }) => {
    dispatchForm({
      type: "data",
      field: { name: target.name, value: target.value },
    });
  };

  const handleButton = (action, formData) => {
    //validar que los datos del form sean mayores a cero
    if (formData[action] > 0) {
      //dispatch send data process
      dispatch({ type: action, data: formData });
      //dispatch reset form
      dispatchForm({
        type: "reset",
      });
    }
  };

  return (
    <>
      <Row className="justify-container-center" mb-3>
        <Col md={12}>
          <Card
            style={{
              width: "100%",
              background: "orange",
              color: "white",
              marginTop: "10px",
            }}
          >
            <Card.Body>
              <Card.Title>La Granja de Alexander Grand</Card.Title>
              <Card.Text>
                <p>
                  {" "}
                  <strong>Farm Grand</strong> es la granja de pollitos de
                  Alexander Grand, una rutina semanal de trabajo consiste en
                  registrar los nuevos nacimientos, los pollitos que que se
                  vuelven adultos (Gallinas), la cantidad de gallinas enviadas a
                  otras granjas, y el total en existencia.
                </p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="justify-container-center" style={{ marginTop: "20px" }}>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Pollitos nacidos</Card.Title>
              <Card.Text>
                Son todas las aves que nacieron en la granja y que tiene menos
                de 1 año.
              </Card.Text>
              <Form>
                <Form.Control
                  type="number"
                  name="little"
                  value={little}
                  onChange={(e) => {
                    onChangeInput(e);
                  }}
                />
              </Form>
              <Stack className="col mt-3 mb-2">
                <Button
                  variant="primary"
                  onClick={(e) => {
                    handleButton("little", form);
                  }}
                >
                  aceptar
                </Button>
              </Stack>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Gallinas adultas</Card.Title>
              <Card.Text>
                Son todos los pollitos que pasaron a ser adultos por cumplir 1
                año de edad.
              </Card.Text>
              <Form>
                <Form.Control
                  value={adult}
                  type="number"
                  name="adult"
                  onChange={(e) => {
                    onChangeInput(e);
                  }}
                />
              </Form>
              <Stack className="col mt-3 mb-2">
                <Button
                  variant="primary"
                  onClick={(e) => {
                    handleButton("adult", form);
                  }}
                >
                  aceptar
                </Button>
              </Stack>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Gallinas Transferidas</Card.Title>
              <Card.Text>
                Solo se pueden enviar a otras granjas las gallinas que son
                adultas.
              </Card.Text>
              <Form>
                <Form.Control
                  type="number"
                  name="sale"
                  value={sale}
                  onChange={(e) => {
                    onChangeInput(e);
                  }}
                />
              </Form>
              <Stack className="col mt-3 mb-2">
                <Button
                  variant="primary"
                  onClick={(e) => {
                    handleButton("sale", form);
                  }}
                >
                  aceptar
                </Button>
              </Stack>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row md={12}>
        <Col>
          <div
            style={{
              color: "gray",
              padding: "10px",
              width: "100%",
              align: "center",
            }}
          >
            Formulario :{form && JSON.stringify(form)}
          </div>
        </Col>
      </Row>
      <Row className="justify-container-center">
        <Col md={6} style={{}}>
          <Card>
            <Card.Body>
              <Card.Title>Estadisticas de la granja</Card.Title>
              <Card.Text>Sin optimizar el render</Card.Text>
              <Stat data={state} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} style={{}}>
          <Card>
            <Card.Body>
              <Card.Title>Estadisticas de la granja</Card.Title>
              <Card.Text>Optimizando el render con React.memo</Card.Text>
              <StatMemo data={state} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Farm;
