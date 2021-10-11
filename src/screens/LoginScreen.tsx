import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { KeyboardAvoidingView, View } from "react-native";
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { Text, Button, Input, IconProps } from "@ui-kitten/components";
import { StackScreenProps } from "@react-navigation/stack";
import { useFormik } from "formik";
import * as Yup from "yup";
//Styles
import { styles } from "../theme/appTheme";
//Components
import { Background } from "../components/shared/Background";
import { Logo } from "../components/shared/Logo";
import {
  UserIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
} from "../components/shared/Icons";
import { LoadingButton } from "../components/shared/LoadingButton";
//Models
import { ILogin } from "../models/ILogin";
import { ILoadingResponse } from "../models/shared/ILoadingResponse";
//Actions
import { startLogin } from "../store/actions/auth/authActions";
//Store
import { RootState } from "../store/store";

const USERNAME = "username";
const PASSWORD = "password";

const ventaAgregarProductoValidationSchema: Yup.SchemaOf<ILogin> = Yup.object({
  username: Yup.string().required("Usuario requerido."),
  password: Yup.string().required("Contraseña requerida."),
});

const initialValues: ILogin = {
  username: "",
  password: "",
};

interface Props extends StackScreenProps<any, any> {}

export const LoginScreen = ({ navigation }: Props) => {
  const dispatch = useDispatch();

  const { loading }: ILoadingResponse = useSelector(
    (state: RootState) => state.ui.submitLoading
  );

  const [securePasswordTextEntry, setSecurePasswordTextEntry] =
    useState<boolean>(true);

  const passwordInput = useRef<Input>(null);

  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    isValid,
    touched,
    setFieldTouched,
  } = useFormik<ILogin>({
    initialValues: initialValues,
    onSubmit: (model: ILogin) => {
      dispatch(startLogin(model));
    },
    validationSchema: ventaAgregarProductoValidationSchema,
  });

  const renderPasswordVisibleIcon = (props: IconProps) => (
    <TouchableWithoutFeedback
      onPress={() => setSecurePasswordTextEntry(!securePasswordTextEntry)}
    >
      {securePasswordTextEntry ? (
        <EyeIcon {...props} />
      ) : (
        <EyeOffIcon {...props} />
      )}
    </TouchableWithoutFeedback>
  );

  return (
    <>
      <Background />
      <KeyboardAvoidingView style={styles.flex} behavior="height">
        <Logo />
        <ScrollView style={styles.flexLayout}>
          <Text status="primary" style={styles.loginText}>
            Control Entradas y Salidas
          </Text>
          <Text style={styles.inputLabel} category="s1" status="primary">
            Usuario
          </Text>
          <Input
            placeholder="Usuario"
            accessoryLeft={UserIcon}
            value={values.username}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={handleChange(USERNAME)}
            onBlur={() => setFieldTouched(USERNAME)}
            blurOnSubmit={false}
            returnKeyType="next"
            onSubmitEditing={() => {
              passwordInput.current!.focus();
            }}
            disabled={loading}
          />
          {touched.username && errors.username && (
            <Text
              style={styles.errorText}
              status="danger"
              appearance="hint"
              category="p2"
            >
              {errors.username}
            </Text>
          )}

          <Text style={styles.inputLabel} category="s1" status="primary">
            Contraseña
          </Text>
          <Input
            placeholder="Contraseña"
            accessoryLeft={LockIcon}
            accessoryRight={renderPasswordVisibleIcon}
            value={values.password}
            autoCorrect={false}
            autoCapitalize="none"
            secureTextEntry={securePasswordTextEntry}
            onChangeText={handleChange(PASSWORD)}
            onBlur={() => setFieldTouched(PASSWORD)}
            returnKeyType="done"
            ref={passwordInput}
            disabled={loading}
          />
          {touched.password && errors.password && (
            <Text
              style={styles.errorText}
              status="danger"
              appearance="hint"
              category="p2"
            >
              {errors.password}
            </Text>
          )}

          <View style={{ paddingVertical: 35 }}>
            {!loading ? (
              <Button
                size="medium"
                disabled={!isValid}
                onPress={() => handleSubmit()}
              >
                Iniciar Sesión
              </Button>
            ) : (
              <LoadingButton text={"Cargando"} status={"primary"} />
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};
