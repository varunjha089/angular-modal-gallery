/*
 * MIT License
 *
 * Copyright (c) 2017 Stefano Cappa
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import angular from 'rollup-plugin-angular-aot';
import sass from 'node-sass';
import CleanCSS from 'clean-css';
import { minify as minifyHtml } from 'html-minifier';

const cssmin = new CleanCSS();
const htmlminOpts = {
  caseSensitive: true,
  collapseWhitespace: true,
  removeComments: true,
};

export default {
  input: 'dist/index.js',
  output: {
    file: 'dist/bundles/angular-modal-gallery.umd.js',
    sourcemap: false,
    format: 'umd',
    name: 'ng.angular.modal.gallery'
  },

  // other output options specified here will be shared by
  // all outputs, unless overridden
  // sourcemap: true,

  plugins: [
    angular({
      preprocessors: {
        template: template => minifyHtml(template, htmlminOpts),
        style: scss => {
          const css = sass.renderSync({data: scss}).css;
          return cssmin.minify(css).styles;
        }
      }
    })
  ],
  external: [
    'mousetrap',
    'hammerjs',
    'font-awesome',
    '@angular/core',
    '@angular/common',
    'rxjs/Observable'
  ],
  globals: {
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
    'rxjs/Observable': 'Rx',
    'rxjs/Subscription': 'Rx'
  }
}
