import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'material-app',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  selectFormGroup: FormGroup;
  selectedObj = [{ base: '1' }, { base: '' }, { base: '' }, { base: '' }];
  userTypeFilters = [
    { key: 1, value: 'Value 1' },
    { key: 2, value: 'Value 2' },
    { key: 3, value: 'Value 3' },
    { key: 4, value: 'Value 4' },
  ];
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.selectFormGroup = this.fb.group({
      frmarray: this.fb.array([]),
    });
    this.selectedObj.forEach((x) => {
      this.skills.push(this.newSkill());
    });
  }
  get skills(): FormArray {
    return this.selectFormGroup.get('frmarray') as FormArray;
  }
  newSkill(): FormGroup {
    return this.fb.group({
      selectedddl: new FormControl([]),
      selectall: new FormControl(false),
    });
  }
  tosslePerOne(index,allSelected) {
    if (allSelected.selected) {
      allSelected.deselect();
      return false;
    }
    if (
      this.skills.value[index].selectedddl.length !==
      this.userTypeFilters.length
    ) {
      this.skills.at(index).get('selectall').patchValue(false);
    } else {
      this.skills.at(index).get('selectall').patchValue(true);
    }
    this.assignList(index);
    console.log(this.selectedObj);
  }
  toggleAllSelection(index) {
    this.skills.at(index).get('selectall')
    .setValue(!this.skills.value[index].selectall);
    console.log(this.skills.value[index].selectall, 'skills');

    if (this.skills.value[index].selectall) {
      this.skills.at(index).get('selectedddl')
        .setValue([...this.userTypeFilters.map((item) => item.key)]);
      this.skills.value[index].selectall = false;
    } else {
      this.skills.value[index].selectall = true;
      this.skills.at(index).get('selectedddl').setValue([]);
    }
    this.assignList(index);
    console.log(this.selectedObj);
  }

  assignList(index) {
    this.selectedObj[index].base = 
    this.skills.at(index).get('selectedddl').value.toString();
  }
}
