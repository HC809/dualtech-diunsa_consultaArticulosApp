import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { SafeAreaView } from "react-native-safe-area-context";
import { DrawerScreenProps } from "@react-navigation/drawer";
import {
  Layout,
  TopNavigation,
  Divider,
  Button,
  Input,
  Text,
  Card,
  Avatar,
} from "@ui-kitten/components";
import { styles } from "../theme/appTheme";
import { IConsultaArticulo } from "../models/IConsultaArticulo";
import { IArticulo } from "../models/IArticulo";
import { View, Image } from "react-native";
import { showMessage } from "react-native-flash-message";
import { trackPromise } from "react-promise-tracker";
import { addZeroes } from "../helpers/functions/shared";
import { fetchConsultaArticulos } from "../helpers/api";
import { AxiosError } from "axios";

interface Props extends DrawerScreenProps<any, any> {}

const CODIGO_BARRA = "codigoBarra";

const initialValues: IConsultaArticulo = {
  codigoBarra: "",
};

export const ConsultaArticuloScreen = ({ navigation }: Props) => {
  const [articulo, setArticulo] = useState<IArticulo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const entradaValidationSchema: Yup.SchemaOf<IConsultaArticulo> = Yup.object({
    codigoBarra: Yup.string()
      .required("Ingrese el código de barra.")
      .min(3, "Ingrese mínimo 2 caracteres.")
      .max(50, "Ingrese máximo 25 caracteres."),
  });

  const consultarArticulo = async (codigoBarra: string) => {
    var response = await fetchConsultaArticulos.get(codigoBarra);
    if (response) {
      setArticulo(response);
    }
  };

  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    isValid,
    handleBlur,
    setFieldValue,
    resetForm,
  } = useFormik<IConsultaArticulo>({
    initialValues: initialValues,
    onSubmit: async (model: IConsultaArticulo) => {
      try {
        await trackPromise(consultarArticulo(model.codigoBarra));
      } catch (error) {
        const err = error as AxiosError;
        if (err.response) {
          var statusCode = err.response.status;
          var errorMsg = err.response.data.error;
          switch (statusCode) {
            case 500:
              showMessage({
                message: errorMsg,
                description: `Error: ${statusCode}`,
                type: "danger",
                animated: true,
                floating: true,
                icon: "danger",
                duration: 5000,
              });
              break;

            case 404:
              showMessage({
                message: `No se encontro artículo con código de barra ${model.codigoBarra}`,
                description: `Error: ${statusCode}`,
                type: "warning",
                animated: true,
                floating: true,
                icon: "warning",
                duration: 5000,
              });
              break;

            default:
              showMessage({
                message: errorMsg ?? "",
                description: `Error desconocido`,
                type: "danger",
                animated: true,
                floating: true,
                icon: "danger",
                duration: 5000,
              });
              break;
          }
        }
      }
    },
    validationSchema: entradaValidationSchema,
  });

  const renderRightActions = () => (
    <Button
      size="small"
      appearance="outline"
      onPress={() => {
        setArticulo(null);
        resetForm();
      }}
      disabled={loading}
    >
      Limpiar
    </Button>
  );

  const renderTitle = () => (
    <View style={styles.titleContainer}>
      <Avatar
        shape="rounded"
        size="giant"
        style={styles.logo}
        source={require("../../assets/diunsa_logo.png")}
      />
      <Text category="h6">Consulta de Artículo</Text>
    </View>
  );

  const titleFooter = () => (
    <View style={{ paddingVertical: 10, paddingHorizontal: 25 }}>
      <Text appearance="hint">{`Cod. ${articulo?.codigoArticulo}`}</Text>
    </View>
  );

  const precioFooter = () => (
    <View style={{ paddingVertical: 10, paddingHorizontal: 25 }}>
      <Text appearance="hint">Precio Normal</Text>
    </View>
  );

  const isvPrecioFooter = () => (
    <View style={{ paddingVertical: 10, paddingHorizontal: 25 }}>
      <Text appearance="hint">ISV incluido</Text>
    </View>
  );

  const precioOfertaFooter = () => (
    <View style={{ paddingVertical: 10, paddingHorizontal: 25 }}>
      <Text appearance="hint">Precio Oferta</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.flex}>
      <TopNavigation title={renderTitle} accessoryRight={renderRightActions} />
      <Divider style={styles.dividerColor} />
      <Layout style={{ padding: 18 }} level="1">
        <Input
          style={styles.formikInput}
          autoCapitalize="characters"
          placeholder="Código de barra"
          value={values.codigoBarra}
          onChangeText={handleChange(CODIGO_BARRA)}
          onBlur={handleBlur(CODIGO_BARRA)}
          returnKeyType="next"
          onSubmitEditing={handleSubmit as (values: any) => void}
          disabled={loading}
        />
        {errors.codigoBarra && (
          <Text style={styles.errorText}>{errors.codigoBarra}</Text>
        )}
      </Layout>

      {/* {!loading ? ( */}
      <Layout level="4" style={styles.flex}>
        {articulo ? (
          <View>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <Card
                  style={{ marginTop: 20, marginHorizontal: 20 }}
                  footer={titleFooter}
                >
                  <Text category="h6">{articulo?.descripcion}</Text>
                </Card>
              </View>

              <View
                style={[
                  {
                    flex: 1,
                    flexDirection: "row",
                    alignContent: "center",
                    marginRight: 20,
                  },
                ]}
              >
                <View style={{ flex: 1 }}>
                  <Card
                    style={{ marginTop: 20, marginRight: 5 }}
                    // status="info"
                    footer={precioFooter}
                  >
                    <Text category="h5" status="basic">
                      {addZeroes(articulo?.precio)}
                    </Text>
                  </Card>
                </View>
                <View style={{ flex: 1 }}>
                  <Card
                    style={{ marginTop: 20, marginHorizontal: 5 }}
                    // status="info"
                    footer={isvPrecioFooter}
                  >
                    <Text category="h5" status="primary">
                      {addZeroes(articulo?.precioConIsv)}
                    </Text>
                  </Card>
                </View>
                <View style={{ flex: 1 }}>
                  <Card
                    style={{ marginTop: 20, marginLeft: 5 }}
                    // status="info"
                    footer={precioOfertaFooter}
                  >
                    <Text category="h5" status="danger">
                      {addZeroes(articulo?.precioOferta ?? 0)}
                    </Text>
                  </Card>
                </View>
              </View>
            </View>

            <Card
              style={{
                marginTop: 20,
                marginBottom: 20,
                marginHorizontal: 20,
              }}
            >
              {!articulo?.imagenUrl ? (
                <View style={{ alignItems: "center" }}>
                  <Image
                    source={require("../../assets/contenido-no-disponible.jpg")}
                    style={{
                      height: 350,
                      resizeMode: "center",
                    }}
                  />
                </View>
              ) : (
                <Image
                  source={{
                    uri: articulo?.imagenUrl,
                  }}
                  style={{ height: 350, resizeMode: "center" }}
                />
              )}
            </Card>
          </View>
        ) : (
          <Text category="h6" style={{ textAlign: "center", marginTop: 10 }}>
            Debe escanear o ingresar el código de barra.
          </Text>
        )}
      </Layout>
      {/* ) : (
        <></>
        // <LoadingIndicator />
      )} */}
    </SafeAreaView>
  );
};
