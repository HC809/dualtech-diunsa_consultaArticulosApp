import React, { useState, useRef, useEffect } from "react";
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
import { View, Image, Keyboard } from "react-native";
import { showMessage } from "react-native-flash-message";
import { trackPromise } from "react-promise-tracker";
import { addZeroes } from "../helpers/functions/shared";
import { fetchConsultaArticulos } from "../helpers/api";
import { AxiosError } from "axios";
import * as Device from "expo-device";
import { SyncIndicator } from "../components/shared/SyncIndicator";

interface Props extends DrawerScreenProps<any, any> {}

const CODIGO_BARRA = "codigoBarra";

const initialValues: IConsultaArticulo = {
  codigoBarra: "",
};

export const ConsultaArticuloScreen = ({}: Props) => {
  const [articulo, setArticulo] = useState<IArticulo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const codigoBarraInput = useRef<Input>(null);

  useEffect(() => {
    setLoading(false);
    codigoBarraInput.current!.focus();
  }, []);

  const entradaValidationSchema: Yup.SchemaOf<IConsultaArticulo> = Yup.object({
    codigoBarra: Yup.string()
      .required("Escanee el código de barra.")
      // .min(3, "Ingrese mínimo 2 caracteres.")
      // .max(50, "Ingrese máximo 25 caracteres."),
  });

  const consultarArticulo = async (codigoBarra: string): Promise<IArticulo> => {
    var macAddress = Device.deviceName ?? "";
    //var regexMac = /^((([0-9A-F]{2}:){5})|(([0-9A-F]{2}-){5})|([0-9A-F]{10}))([0-9A-F]{2})$/i
    var response = await fetchConsultaArticulos.get(codigoBarra, macAddress);

    return response;
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
        setArticulo(null);
        setLoading(true);
        await trackPromise(
          consultarArticulo(model.codigoBarra).then((artResponse) => {
            setArticulo(artResponse);
          })
        );
      } catch (error) {
        const err = error as AxiosError;
        if (err.response) {
          var statusCode = err.response.status;
          var errorMsg =
            err.response.data.error ??
            err.response.data ??
            "Error desconocido.";

          switch (statusCode) {
            case 500:
              showMessage({
                message: errorMsg,
                description: `Error: ${statusCode} (Internal Server Error)`,
                type: "danger",
                animated: true,
                floating: true,
                icon: "danger",
                duration: 5000,
              });
              break;

            case 400:
              showMessage({
                message: errorMsg,
                description: `Error: ${statusCode} (Bad Request)`,
                type: "danger",
                animated: true,
                floating: true,
                icon: "danger",
                duration: 5000,
              });
              break;

            case 404:
              showMessage({
                message: errorMsg,
                description: `Error: ${statusCode} (Not Found)`,
                type: "warning",
                animated: true,
                floating: true,
                icon: "warning",
                duration: 5000,
              });
              break;

            default:
              showMessage({
                message: errorMsg,
                description: "NETWORK ERROR",
                type: "danger",
                animated: true,
                floating: true,
                icon: "danger",
                duration: 5000,
              });
              break;
          }
        }
      } finally {
        setLoading(false);
        setFieldValue(CODIGO_BARRA, "");
      }
    },
    validationSchema: entradaValidationSchema,
  });

  const renderRightActions = () => (
    <View style={{ flexDirection: "row" }}>
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
      <Button
        size="small"
        onPress={handleSubmit as (values: any) => void}
        disabled={loading}
      >
        Consultar
      </Button>
    </View>
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

  const precioOfertaFooter = () => (
    <View style={{ paddingVertical: 10, paddingHorizontal: 25 }}>
      <Text appearance="hint">Precio Oferta</Text>
    </View>
  );

  const precioAhorroMasFooter = () => (
    <View style={{ paddingVertical: 10, paddingHorizontal: 25 }}>
      <Text appearance="hint">Ahorro Mas</Text>
    </View>
  );

  const precioCrediDiunsaFooter = () => (
    <View style={{ paddingVertical: 10, paddingHorizontal: 25 }}>
      <Text appearance="hint">CrediDiunsa</Text>
    </View>
  );

  const cuotaCrediDiunsaNormalFooter = () => (
    <View style={{ paddingVertical: 10, paddingHorizontal: 25 }}>
      <Text appearance="hint">Cuota Normal</Text>
    </View>
  );

  const cuotaCrediDiunsaVIPFooter = () => (
    <View style={{ paddingVertical: 10, paddingHorizontal: 25 }}>
      <Text appearance="hint">Cuota VIP</Text>
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
          showSoftInputOnFocus={false}
          returnKeyType="next"
          ref={codigoBarraInput}
          onSubmitEditing={handleSubmit as (values: any) => void}
          disabled={loading}
        />
        {errors.codigoBarra && (
          <Text style={styles.errorText}>{errors.codigoBarra}</Text>
        )}
      </Layout>

      <Layout level="4" style={styles.flex}>
        <SyncIndicator />
        {articulo ? (
          <View>
            <View
              style={[
                {
                  flexDirection: "row",
                  alignContent: "center",
                  marginHorizontal: 20,
                },
              ]}
            >
              <View style={{ width: "50%" }}>
                <Card style={{ marginTop: 10 }} footer={titleFooter}>
                  <Text category="h6">{articulo?.descripcion}</Text>
                </Card>
              </View>
              <View style={{ flex: 1 }}>
                <Card
                  style={{ marginTop: 10, marginHorizontal: 10 }}
                  footer={precioFooter}
                >
                  <Text category="h6" status="basic">
                    {addZeroes(articulo?.precioNormal)}
                  </Text>
                </Card>
              </View>
              <View style={{ flex: 1 }}>
                <Card
                  style={{ marginTop: 10, marginHorizontal: 5 }}
                  footer={precioOfertaFooter}
                >
                  <Text category="h6" status="danger">
                    {addZeroes(articulo?.precioOferta)}
                  </Text>
                </Card>
              </View>
            </View>

            <Card
              style={{
                marginTop: 10,
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
                  style={{ height: 250, resizeMode: "center" }}
                />
              )}
            </Card>

            <View
              style={[
                {
                  flexDirection: "row",
                  alignContent: "center",
                  marginHorizontal: 20,
                },
              ]}
            >
              <View style={{ flex: 1 }}>
                <Card
                  style={{ marginTop: 10, marginLeft: 5 }}
                  footer={precioAhorroMasFooter}
                >
                  <Text category="h5" status="primary">
                    {addZeroes(articulo?.precioAhorroMas ?? 0)}
                  </Text>
                </Card>
              </View>
              <View style={{ flex: 1 }}>
                <Card
                  style={{ marginTop: 10, marginHorizontal: 5 }}
                  footer={precioCrediDiunsaFooter}
                >
                  <Text category="h5" style={{ color: "#ff8c00" }}>
                    {addZeroes(articulo?.precioCrediDiunsa)}
                  </Text>
                </Card>
              </View>
              <View style={{ flex: 1 }}>
                <Card
                  style={{ marginTop: 10, marginRight: 5 }}
                  footer={cuotaCrediDiunsaNormalFooter}
                >
                  <Text category="h5" style={{ color: "#E47D00" }}>
                    {addZeroes(articulo?.cuotaCrediDiunsaNormal)}
                  </Text>
                </Card>
              </View>
              <View style={{ flex: 1 }}>
                <Card
                  style={{ marginTop: 10, marginHorizontal: 5 }}
                  footer={cuotaCrediDiunsaVIPFooter}
                >
                  <Text category="h5" style={{ color: "#efb810" }}>
                    {addZeroes(articulo?.cuotaCrediDiunsaVIP)}
                  </Text>
                </Card>
              </View>
            </View>
            <Text category="h6" style={{ textAlign: "center", marginTop: 10 }}>
              Todos los precios incluyen ISV
            </Text>
          </View>
        ) : (
          !loading ?? (
            <Text category="h6" style={{ textAlign: "center", marginTop: 10 }}>
              Debe escanear o ingresar el código de barra.
            </Text>
          )
        )}
      </Layout>
    </SafeAreaView>
  );
};
