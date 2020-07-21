/**
 *
 * 功能描述:
 *
 * @className AlbumCourseProblemHistoryListItemRequest
 * @projectName h5-front
 * @author yanshaowen
 * @date 2020/5/31 6:55
 */
import { JsonProperty } from 'papio-h5'

export class AlbumCourseProblemAddRequest {
  @JsonProperty
  private albumId: number
  public getAlbumId (): number {
    return this.albumId
  }
  public setAlbumId (albumId: number): void {
    this.albumId = albumId
  }
}
