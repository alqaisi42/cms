export default {
  isSelected(rowId) {
    return appsmith.store.selectedDrugRowId === rowId;
  }
}
