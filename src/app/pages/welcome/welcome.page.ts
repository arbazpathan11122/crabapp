import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  // slidesOpts = {
  //   slidesPerView: 3,
  //   coverflowEffect: {
  //     rotate: 50,
  //     stretch: 0,
  //     depth: 100,
  //     modifier: 1,
  //     slideShadows: true,
  //   },
  //   on: {
  //     beforeInit() {
  //       const swiper = this;

  //       swiper.classNames.push(`${swiper.params.containerModifierClass}coverflow`);
  //       swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);

  //       swiper.params.watchSlidesProgress = true;
  //       swiper.originalParams.watchSlidesProgress = true;
  //     },
  //     setTranslate() {
  //       const swiper = this;
  //       const {
  //         width: swiperWidth, height: swiperHeight, slides, $wrapperEl, slidesSizesGrid, $
  //       } = swiper;
  //       const params = swiper.params.coverflowEffect;
  //       const isHorizontal = swiper.isHorizontal();
  //       const transform$$1 = swiper.translate;
  //       const center = isHorizontal ? -transform$$1 + (swiperWidth / 2) : -transform$$1 + (swiperHeight / 2);
  //       const rotate = isHorizontal ? params.rotate : -params.rotate;
  //       const translate = params.depth;
  //       // Each slide offset from center
  //       for (let i = 0, length = slides.length; i < length; i += 1) {
  //         const $slideEl = slides.eq(i);
  //         const slideSize = slidesSizesGrid[i];
  //         const slideOffset = $slideEl[0].swiperSlideOffset;
  //         const offsetMultiplier = ((center - slideOffset - (slideSize / 2)) / slideSize) * params.modifier;

  //         let rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
  //         let rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
  //         // var rotateZ = 0
  //         let translateZ = -translate * Math.abs(offsetMultiplier);

  //         let translateY = isHorizontal ? 0 : params.stretch * (offsetMultiplier);
  //         let translateX = isHorizontal ? params.stretch * (offsetMultiplier) : 0;

  //         // Fix for ultra small values
  //         if (Math.abs(translateX) < 0.001) { translateX = 0; }
  //         if (Math.abs(translateY) < 0.001) { translateY = 0; }
  //         if (Math.abs(translateZ) < 0.001) { translateZ = 0; }
  //         if (Math.abs(rotateY) < 0.001) { rotateY = 0; }
  //         if (Math.abs(rotateX) < 0.001) { rotateX = 0; }

  //         const slideTransform = `translate3d(${translateX}px,${translateY}px,${translateZ}px)
  //       rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  //         $slideEl.transform(slideTransform);
  //         $slideEl[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
  //         if (params.slideShadows) {
  //           // Set shadows
  //           let $shadowBeforeEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
  //           let $shadowAfterEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
  //           if ($shadowBeforeEl.length === 0) {
  //             $shadowBeforeEl = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'left' : 'top'}"></div>`);
  //             $slideEl.append($shadowBeforeEl);
  //           }
  //           if ($shadowAfterEl.length === 0) {
  //             $shadowAfterEl = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'right' : 'bottom'}"></div>`);
  //             $slideEl.append($shadowAfterEl);
  //           }
  //           if ($shadowBeforeEl.length) { $shadowBeforeEl[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0; }
  //           if ($shadowAfterEl.length) { $shadowAfterEl[0].style.opacity = (-offsetMultiplier) > 0 ? -offsetMultiplier : 0; }
  //         }
  //       }

  //       // Set correct perspective for IE10
  //       if (swiper.support.pointerEvents || swiper.support.prefixedPointerEvents) {
  //         const ws = $wrapperEl[0].style;
  //         ws.perspectiveOrigin = `${center}px 50%`;
  //       }
  //     },
  //     setTransition(duration) {
  //       const swiper = this;
  //       swiper.slides
  //         .transition(duration)
  //         .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
  //         .transition(duration);
  //     }
  //   }
  // };

  slidesOpts = {
    on: {
      beforeInit() {
        const swiper = this;
        swiper.classNames.push(`${swiper.params.containerModifierClass}flip`);
        swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
        const overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 0,
          virtualTranslate: true,
        };
        swiper.params = Object.assign(swiper.params, overwriteParams);
        swiper.originalParams = Object.assign(swiper.originalParams, overwriteParams);
      },
      setTranslate() {
        const swiper = this;
        const { $, slides, rtlTranslate: rtl } = swiper;
        for (let i = 0; i < slides.length; i += 1) {
          const $slideEl = slides.eq(i);
          let progress = $slideEl[0].progress;
          if (swiper.params.flipEffect.limitRotation) {
            progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
          }
          const offset$$1 = $slideEl[0].swiperSlideOffset;
          const rotate = -180 * progress;
          let rotateY = rotate;
          let rotateX = 0;
          let tx = -offset$$1;
          let ty = 0;
          if (!swiper.isHorizontal()) {
            ty = tx;
            tx = 0;
            rotateX = -rotateY;
            rotateY = 0;
          } else if (rtl) {
            rotateY = -rotateY;
          }

          $slideEl[0].style.zIndex = -Math.abs(Math.round(progress)) + slides.length;

          if (swiper.params.flipEffect.slideShadows) {
            // Set shadows
            let shadowBefore = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
            let shadowAfter = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
            if (shadowBefore.length === 0) {
              shadowBefore = swiper.$(`<div class="swiper-slide-shadow-${swiper.isHorizontal() ? 'left' : 'top'}"></div>`);
              $slideEl.append(shadowBefore);
            }
            if (shadowAfter.length === 0) {
              shadowAfter = swiper.$(`<div class="swiper-slide-shadow-${swiper.isHorizontal() ? 'right' : 'bottom'}"></div>`);
              $slideEl.append(shadowAfter);
            }
            if (shadowBefore.length) { shadowBefore[0].style.opacity = Math.max(-progress, 0); }
            if (shadowAfter.length) { shadowAfter[0].style.opacity = Math.max(progress, 0); }
          }
          $slideEl
            .transform(`translate3d(${tx}px, ${ty}px, 0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
        }
      },
      setTransition(duration) {
        const swiper = this;
        const { slides, activeIndex, $wrapperEl } = swiper;
        slides
          .transition(duration)
          .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
          .transition(duration);
        if (swiper.params.virtualTranslate && duration !== 0) {
          let eventTriggered = false;
          // eslint-disable-next-line
          slides.eq(activeIndex).transitionEnd(function onTransitionEnd() {
            if (eventTriggered) { return; }
            if (!swiper || swiper.destroyed) { return; }

            eventTriggered = true;
            swiper.animating = false;
            const triggerEvents = ['webkitTransitionEnd', 'transitionend'];
            for (let i = 0; i < triggerEvents.length; i += 1) {
              $wrapperEl.trigger(triggerEvents[i]);
            }
          });
        }
      }
    }
  };
  Restaurent_Id: any;
  constructor(

    @Inject(Router) private router: Router,
    @Inject(AngularFirestore) private firestore: AngularFirestore,
    @Inject(ActivatedRoute) private activatedRoute: ActivatedRoute,

  ) {
    this.subscribeRouteChanges();
  }

  ngOnInit() {
  }
  subscribeRouteChanges() {

    this.activatedRoute.queryParams
      .subscribe((e: Params) => {
        // tslint:disable-next-line: radix

        console.log(e);

        this.Restaurent_Id = e.restaurent;
        this.getRestaurentById(this.Restaurent_Id);


      }, (err: any) => {
        // this.router.navigate(['/process']);
      });

  }
  getRestaurentById(id) {
    this.firestore.collection('Restaurent').doc(id).get().subscribe(doc => {
      console.log(doc.data());


    });
  }
}
