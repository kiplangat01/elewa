import { Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';

import { Story } from '@app/model/convs-mgr/stories/main';

import { BotMutationEnum } from '@app/model/convs-mgr/bots';

// TODO:@LemmyMwaura This imports should come from a shared module. - fix after AT
import { 
  DeleteBotModalComponent,
  DeleteElementsEnum, 
  CreateLessonModalComponent
} from '@app/features/convs-mgr/stories/home';

@Component({
  selector: 'app-modules-lessons-grid-view',
  templateUrl: './modules-lessons-grid-view.component.html',
  styleUrls: ['./modules-lessons-grid-view.component.scss'],
})
export class ModulesLessonsGridViewComponent implements OnInit {
  
  stories: Story[] = [];

  @Input()
  set moduleLessonsData (value: Story[]) {
    if (value) this.stories = value;
  }

  constructor(private _router$$: Router,
              private _dialog: MatDialog
  ) {}

  ngOnInit() {
    console.log({'stories': this.stories});
  }

  openLesson(id: string) {
    this._router$$.navigate(['stories', id]);
  }

  editLesson(story: Story) {
    this._dialog.open(CreateLessonModalComponent, {
      minWidth: '600px', 
      data: {
        botMode: BotMutationEnum.EditMode, story: story
      }
    }).afterClosed();
  }

  deleteLesson(story: Story) {
    this._dialog.open(DeleteBotModalComponent, {
      minWidth: 'fit-content', 
      data: { 
        mode: DeleteElementsEnum.Story, element: story
      }
    }).afterClosed();
  }
}