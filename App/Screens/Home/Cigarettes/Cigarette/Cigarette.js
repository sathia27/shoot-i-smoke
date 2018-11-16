// Copyright (c) 2018, Amaury Martiny and the Shoot! I Smoke contributors
// SPDX-License-Identifier: GPL-3.0

import React, { PureComponent } from 'react';
import { Image, StyleSheet, View } from 'react-native';

import butt from '../../../../../assets/images/butt.png';
import buttVertical from '../../../../../assets/images/butt-vertical.png';
import head from '../../../../../assets/images/head.png';
import headVertical from '../../../../../assets/images/head-vertical.png';

export class Cigarette extends PureComponent {
  static defaultProps = {
    length: 1
  };

  getButtStyle = () => {
    const ratio = 280 / 21; // Ratio of our image
    const { size } = this.props;

    switch (size) {
      case 'big':
        return {
          overflow: 'hidden',
          height: this.getMaxWidth() / ratio,
          width: this.getMaxWidth()
        };
      case 'medium':
        return {
          overflow: 'hidden',
          height: this.getMaxWidth(),
          marginHorizontal: 4,
          width: this.getMaxWidth() / ratio
        };
      default:
        return {
          overflow: 'hidden',
          height: this.getMaxWidth(),
          marginHorizontal: 2,
          width: this.getMaxWidth() / ratio
        };
    }
  };

  getHeadStyle = () => {
    const ratio = 27 / 20; // Ratio of our image
    const { size } = this.props;
    switch (size) {
      case 'big':
        return {};
      case 'medium':
        return {
          height: 12 * ratio,
          marginHorizontal: 4,
          width: 12
        };
      default:
        return {
          height: 6 * ratio,
          marginHorizontal: 2,
          width: 6
        };
    }
  };

  getMaxWidth = () => {
    const { diagonal, size } = this.props;
    if (diagonal) return 200;
    switch (size) {
      case 'big':
        return 280;
      case 'medium':
        return 160;
      default:
        return 81;
    }
  };

  render() {
    const { diagonal, length, style, vertical } = this.props;

    // Max and min lengths of a cigarette
    const maxWidth = this.getMaxWidth();
    const minWidth = 0.4 * maxWidth;

    return (
      <View
        style={[
          diagonal
            ? {
                justifyContent: 'center',
                height:
                  (minWidth + length * (maxWidth - minWidth)) / Math.sqrt(2),
                width:
                  (minWidth + length * (maxWidth - minWidth)) / Math.sqrt(2)
              }
            : null
        ]}
      >
        <View
          removeClippedSubviews
          style={[
            styles.container,
            diagonal
              ? {
                  width: minWidth + length * (maxWidth - minWidth)
                }
              : vertical
              ? {
                  height: minWidth + length * (maxWidth - minWidth)
                }
              : {
                  width: minWidth + length * (maxWidth - minWidth)
                },
            diagonal ? styles.diagonal : null,
            style
          ]}
        >
          <Image
            source={vertical ? buttVertical : butt}
            style={this.getButtStyle()}
          />
          <Image
            source={vertical ? headVertical : head}
            style={[styles.head, this.getHeadStyle()]}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    marginTop: 8,
    overflow: 'hidden'
  },
  diagonal: {
    transform: [{ rotate: '45deg' }, { scale: 1 }]
  },
  head: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    top: 0
  }
});
