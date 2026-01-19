import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as groupApi from '../lib/helpers/groupApi.js';
import * as ajaxhelper from '../lib/helpers/ajaxhelper.js';

vi.mock('../lib/helpers/ajaxhelper.js');

describe('groupApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getGroups', () => {
    it('should fetch all groups', async () => {
      const mockGroups = { data: [{ id: 1, name: 'Group 1' }] };
      vi.mocked(ajaxhelper.getData).mockResolvedValue(mockGroups);

      const result = await groupApi.getGroups();

      expect(ajaxhelper.getData).toHaveBeenCalled();
      expect(result).toEqual(mockGroups);
    });
  });

  describe('getGroupById', () => {
    it('should fetch a group by id', async () => {
      const mockGroup = { id: 1, name: 'Group 1' };
      vi.mocked(ajaxhelper.getData).mockResolvedValue(mockGroup);

      const result = await groupApi.getGroupById(1);

      expect(ajaxhelper.getData).toHaveBeenCalled();
      expect(result).toEqual(mockGroup);
    });
  });

  describe('createGroup', () => {
    it('should create a new group', async () => {
      const newGroup = { name: 'New Group', teacherId: 1 };
      const mockResponse = { id: 1, ...newGroup };
      vi.mocked(ajaxhelper.postData).mockResolvedValue(mockResponse);

      const result = await groupApi.createGroup(newGroup);

      expect(ajaxhelper.postData).toHaveBeenCalledWith(
        expect.stringContaining('/groups'),
        newGroup
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deleteGroup', () => {
    it('should delete a group', async () => {
      const mockResponse = { message: 'deleted' };
      vi.mocked(ajaxhelper.deleteData).mockResolvedValue(mockResponse);

      const result = await groupApi.deleteGroup(1);

      expect(ajaxhelper.deleteData).toHaveBeenCalledWith(
        expect.stringContaining('/groups/1')
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getUnassignedStudents', () => {
    it('should fetch unassigned students', async () => {
      const mockStudents = { students: [{ id: 1, name: 'Student 1' }] };
      vi.mocked(ajaxhelper.getData).mockResolvedValue(mockStudents);

      const result = await groupApi.getUnassignedStudents();

      expect(ajaxhelper.getData).toHaveBeenCalled();
      expect(result).toEqual(mockStudents);
    });
  });

  describe('addStudentToGroup', () => {
    it('should add a student to a group', async () => {
      const mockResponse = { message: 'student added' };
      vi.mocked(ajaxhelper.postData).mockResolvedValue(mockResponse);

      const result = await groupApi.addStudentToGroup(1, 2);

      expect(ajaxhelper.postData).toHaveBeenCalledWith(
        expect.stringContaining('/groups/1/students/2'),
        {}
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('removeStudentFromGroup', () => {
    it('should remove a student from a group', async () => {
      const mockResponse = { message: 'student removed' };
      vi.mocked(ajaxhelper.deleteData).mockResolvedValue(mockResponse);

      const result = await groupApi.removeStudentFromGroup(1, 2);

      expect(ajaxhelper.deleteData).toHaveBeenCalledWith(
        expect.stringContaining('/groups/1/students/2')
      );
      expect(result).toEqual(mockResponse);
    });
  });
});