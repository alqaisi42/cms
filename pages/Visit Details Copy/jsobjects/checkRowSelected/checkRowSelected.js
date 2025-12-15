export default {
  isSelected(rowId) {
    return appsmith.store.selectedICDRowId === rowId;
  }
}
