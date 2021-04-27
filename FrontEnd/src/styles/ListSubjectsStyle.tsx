import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  itemProductContainer: {
    height: 30,
    paddingBottom: 8,
    marginTop: 30,
    padding: 10,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  itemProductName: {
    color: '#8889a5',
    fontSize: 20,
    fontWeight: '400',
    width: 100,
    marginLeft: 30

  },
  goToProductDetailButton: {
    width: 100,
    height: 30,
    backgroundColor: "#15d686",
    borderRadius: 24,
    marginRight: 60,

    justifyContent: 'center',
    alignItems: 'center'
  },
  studentInfo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    backgroundColor: "blue",
    marginTop: 20,
  },
  content: {
    paddingTop: 20,
  },
  info: {
    color: '#000000',
    fontSize: 15,
    fontWeight: '400',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    width: 100,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  buttonLogout:{
    alignItems:'center',
    justifyContent:'center',
    marginTop: 20
  }

})

export default styles;