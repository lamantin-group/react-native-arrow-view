//
//  YandexPayment.swift
//  MyFramework
//
//  Created by Антон Власов on 03/09/2019.
//  Copyright © 2019 whalemare. All rights reserved.
//

import Foundation

@objc(NativeLibrary)
class NativeLibrary: RCTViewManager {
    
    @objc
    func getValue(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) -> Void {
        resolve("Hello from native ios")
    }
}
