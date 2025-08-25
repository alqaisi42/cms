export default {
  isSelected(rowId) {
    return appsmith.store.selectedClmDtlRowId === rowId;
  }
}
