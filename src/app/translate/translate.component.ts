import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Language, LanguageDetection, TranslatedText } from './model/language.model';
import { TranslateService } from './translate.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegistrationPath } from '../app-routing.module';
import { LocalStoreService } from '../core/local-store.service';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.scss']
})
export class TranslateComponent implements OnInit {
  form: FormGroup;
  languages?: Language[];
  translation: TranslatedText =
    {
      translatedText: ''
    }

  constructor(readonly translateService: TranslateService, readonly router: Router, readonly snackBar: MatSnackBar, readonly localStoreService: LocalStoreService) {
    this.form = new FormGroup({
      sourceLanguage: new FormControl('', Validators.required),
      targetLanguage: new FormControl('', Validators.required),
      sourceText: new FormControl('', Validators.required),
    });

    translateService.getLanguages().subscribe(languages => this.languages = languages);
  }

  ngOnInit(): void {
  }

  translate() {
    this.translateService.translate(this.form.value.sourceText, this.form.value.sourceLanguage!, this.form.value.targetLanguage!).subscribe(translation => {
      this.translation = translation

      if (this.translation.error) {
        this.snackBar.open(this.translation.error, 'OK', { duration: 5000 })
      } else
        if (!this.localStoreService.freeTranslationsAllowed() && !this.localStoreService.isUserRegistered()) {
          this.router.navigateByUrl(RegistrationPath);
        }
    });
  }

  detectLanguage() {
    this.translateService.detect(this.form.value.sourceText).subscribe((languageDetections: LanguageDetection[]) => this.form.setValue({
      sourceLanguage: languageDetections[0].language,
      sourceText: this.form.value.sourceText,
      targetLanguage: ''
    }));
  }
}
