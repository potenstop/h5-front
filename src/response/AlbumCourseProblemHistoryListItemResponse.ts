import { JsonProperty } from 'papio-h5'
import { AlbumCourseListItemBasicFrontResponse } from '@/response/AlbumCourseListItemBasicFrontResponse'

/**
 *
 * 功能描述:
 *
 * @className AlbumCourseProblemHistoryListItemResponse
 * @projectName h5-front
 * @author yanshaowen
 * @date 2020/5/31 6:58
 */
export class AlbumCourseProblemHistoryListItemResponse extends AlbumCourseListItemBasicFrontResponse {
  @JsonProperty
  private albumCourseProblemId: number;
  public getAlbumCourseProblemId (): number {
    return this.albumCourseProblemId
  }
  public setAlbumCourseProblemId (albumCourseProblemId: number): void {
    this.albumCourseProblemId = albumCourseProblemId
  }
}
